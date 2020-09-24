import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import User from "../screens/User";
import SubmitVenue from "../screens/SubmitVenue";
import VendorLogin from "../screens/VendorLogin";
import FAQ from "../screens/FAQ";
import ContactUs from "../screens/ContactUs";

const UserStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: "Profile",
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
        name="Submit a Venue"
        component={SubmitVenue}
        options={{
          title: "Submit a Venue",
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
        name="Login as Vendor"
        component={VendorLogin}
        options={{
          title: "Vendor Login",
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
        name="FAQ"
        component={FAQ}
        options={{
          title: "FAQ",
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
        name="ContactUs"
        component={ContactUs}
        options={{
          title: "Contact Us",
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
    </Stack.Navigator>
  );
};

export default UserStack;
