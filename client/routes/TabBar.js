import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Home from "../screens/Home";
import VenueStack from "./VenueStack";
import { Image } from "react-native";
import TapsTopBar from "./TapTopBar";
import UserStack from "../routes/UserStack";
import { connect } from "react-redux";
import { firebase } from "../firebase/config";
import { tapsToState } from "../actions/basket";
import PaymentStack from "./PaymentStack";

const Tab = createBottomTabNavigator();
function TabBar({ basket, taps, user, tapsToState }) {
  useEffect(() => {
    firebase
      .firestore()
      .collection("taps")
      .where("sentTo", "==", user[0].email)
      .where("isRedeemed", "==", false)
      .where("sent", "==", true)

      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        tapsToState(data);
      });
    return () => {};
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#4A4D42",
        inactiveTintColor: "#DADADA",
        style: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? "#4A4D42" : "#DADADA"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={PaymentStack}
        options={{
          tabBarBadge: basket.length > 0 ? basket.length : null,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="shopping-basket"
              size={24}
              color={focused ? "#4A4D42" : "#DADADA"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Send a Tap"
        component={VenueStack}
        options={{
          showLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/logo.png")}
              fadeDuration={0}
              style={{ width: 60, height: 60, marginBottom: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Taps"
        component={TapsTopBar}
        options={{
          tabBarBadge: taps > 0 ? taps : null,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="gesture-double-tap"
              size={24}
              color={focused ? "#4A4D42" : "#DADADA"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#4A4D42" : "#DADADA"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    basket: state.quantityReducer.basket,
    taps: state.tapReducer.taps,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tapsToState: (taps) => dispatch(tapsToState(taps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
