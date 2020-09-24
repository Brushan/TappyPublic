import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
const firebaseConfig = {
 // <ADD FIREBASE CONFIG HERE: >
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
