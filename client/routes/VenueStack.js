import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VenueList from "../screens/VenueList";
import Venue from "../screens/Venue";

const Stack = createStackNavigator();
function VenueStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VenueList"
        component={VenueList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Venue"
        component={Venue}
        options={{
          title: "Menu",
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
}

export default VenueStack;
