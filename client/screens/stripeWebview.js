import React from "react";
import { WebView } from "react-native-webview";
import { StackActions, CommonActions } from "@react-navigation/native";
import { connect } from "react-redux";
import { clearBasket } from "../actions/basket";

const stripeWebview = ({ navigation, route, clearBasket }) => {
  handleChange = (e) => {
    if (
      !route.params.loading &&
      e.url ===
        `https://us-central1-tappy-20499.cloudfunctions.net/app/payment/success`
    ) {
      console.log("Transaction completed");
      clearBasket();

      navigation.dispatch(StackActions.popToTop());
      navigation.dispatch(
        CommonActions.navigate("OrderPlaced", { orderId: route.params.orderId })
      );
    } else if (
      !route.params.loading &&
      e.url ===
        `https://us-central1-tappy-20499.cloudfunctions.net/app/payment/cancel`
    ) {
      console.log("Cancel");
      navigation.goBack();

      //TODO: Remove items from database

      alert("Payment Cancelled.");
    }
  };

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        uri: `https://us-central1-tappy-20499.cloudfunctions.net/app/web/checkout/redirect?sessionId=${route.params.sessionId}`,
      }}
      onNavigationStateChange={this.handleChange}
      ref={(ref) => {
        webview = ref;
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearBasket: () => dispatch(clearBasket()),
  };
};

export default connect(null, mapDispatchToProps)(stripeWebview);
