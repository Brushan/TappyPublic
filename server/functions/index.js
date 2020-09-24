const functions = require("firebase-functions");
// const stripe = require("stripe")("<ADD STRIPE SECRET KEY HERE>");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const mailgun = require("mailgun-js");
const DOMAIN = 'mg.tappy.co';
// const mg = mailgun({apiKey: '<ADD MAILGUN API KEY HERE>', domain: DOMAIN});

const serviceAccount = require("./serviceAccountKey.json");
const BASE_URL = "https://us-central1-tappy-20499.cloudfunctions.net/app";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tappy-20499.firebaseio.com",
});

const db = admin.firestore();

let total = 0;

app.use(express.json());
app.use("/stripe/webhook", express.raw({ type: "*/*" }));
app.use(bodyParser.json({
  verify: function (req, res, buf) {
    var url = req.originalUrl;
    if (url.startsWith('/stripe'))
      req.rawBody = buf.toString();
  }
}));

const sendEmail = (to, from, subject, text) => {
  let data = {
    to,
    from,
    subject,
    text
  };
  return mg.messages().send(data);
}

app.post('/contact', async (req, res, next) => {
  try {
    console.log(req.body.message)
    await sendEmail(req.body.to, 'no-reply@tappy.co', req.body.subject, req.body.text)
    res.send('email sent')
  } catch(e) {
      console.log(e);
      res.status(500);
  }
})

app.post("/checkout", async (req, res) => {
  try {
    await (async () => {
      try {
        let query = db
          .collection("taps")
          .where("basketId", "==", req.body.basketId);
        let response = [];
        await query.get().then((querySnapshot) => {
          let docs = querySnapshot.docs;
          for (let doc of docs) {
            const price = doc.data().price;
            response.push(parseInt(price));
          }
        });
        total = await response.reduce((a, b) => a + b, 0);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();

    const order_items = [
      {
        name: "Your order",
        currency: "SEK",
        quantity: 1,
        amount: total * 100,
      },
    ];

    let success_url = "";
    let cancel_url = "";

    success_url = `${BASE_URL}/payment/success`;
    cancel_url = `${BASE_URL}/payment/cancel`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: order_items,
      success_url,
      cancel_url,
      client_reference_id: req.body.basketId,
      customer_email: req.body.customerEmail,
    });

    res.send({ orderId: req.body.basketId.toString(), sessionId: session.id });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/web/checkout/redirect", async (req, res) => {
  const checkoutHtmlPage = (stripePublicKey, sessionId) => {
    return `<html>
      <body>
        <!-- Load Stripe.js on your website. -->
        <script src="https://js.stripe.com/v3"></script>
        <h1>Redirecting you to Checkout...</h1>
        <div id="error-message"></div>
        <script>
          (function () {
            var stripe = Stripe('${stripePublicKey}');
            window.onload = function () {
              stripe.redirectToCheckout({
                sessionId: '${sessionId}'
              })
              .then(function (result) {
                if (result.error) {
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              });
            };
          })();
        </script>
      </body>
    </html>`;
  };
  res.send(
    checkoutHtmlPage(
      // "<STIPE PUBLIC KEY>",
      req.query.sessionId
    )
  );
});

app.get("/payment/success", (req, res) => {
  if (req.query.platform === "web") {
    const checkoutSuccessHtmlPage = `
    <html>
      <body>
        <h1>Payment Success</h1>
        <script>
          window.close();
        </script>
      </body>
    </html>`;
    res.send(checkoutSuccessHtmlPage);
  } else res.json({ success: true });
});

app.get("/payment/cancel", (req, res) => {
  if (req.query.platform === "web") {
    const checkoutCanceledHtmlPage = `
    <html>
      <body>
        <h1>Payment Canceled</h1>
        <script>
          window.close();
        </script>
      </body>
    </html>`;
    res.send(checkoutCanceledHtmlPage);
  } else res.json({ success: false });
});

app.post("/stripe/webhook", async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    console.log(sig);
    let event;
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      "whsec_HyCgIauZcyGwTGAwEH1wFi1fqNOMJteZ"
    );
    if (event.type === "checkout.session.completed") {
      // Fulfill the purchase...
      let taps = db.collection("taps")
        taps.where("basketId", "==", "f76a6a44-91df-49e4-9811-7f9bf4b25808")
        .get()
        .then(snapshots => {
          if (snapshots.isPaid === false) {
            snapshots.forEach(tab => {
              taps.doc(tab.id).update({ isPaid: true })
            })
          }
        })
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  res.json({ received: true });
});

exports.app = functions.https.onRequest(app);
