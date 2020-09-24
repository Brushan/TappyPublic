import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import stripeWebview from "../screens/stripeWebview";
import OrderPlaced from "../screens/OrderPlaced";
import Basket from "../screens/Basket";

const Stack = createStackNavigator();

function PaymentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Basket"
        component={Basket}
        options={{
          title: "Basket",
          headerLeft: null,
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: 'Eksell'
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="stripeWebview"
        component={stripeWebview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderPlaced"
        component={OrderPlaced}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default PaymentStack;
