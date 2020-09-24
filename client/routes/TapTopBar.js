import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Taps from '../screens/Taps';
import Unsent from '../screens/Unsent';
import TapHistory from '../screens/TapHistory';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator()

function TapsTop() {
    return (
      <Tab.Navigator
        initialRouteName="Taps"
   
        tabBarOptions={{
          activeTintColor: '#36392e',
          inactiveTintColor: '#36392e',
          style: {
            backgroundColor: '#FFFFFF',
            paddingTop: 40
          },
          labelStyle: {
            textAlign: 'center',
            fontFamily: "Eksell",
            fontSize: 15,
          },
          indicatorStyle: {
            borderBottomColor: '#5f6c3b',
            borderBottomWidth: 4,
          },
        }}>
        <Tab.Screen
          name="Taps"
          component={Taps}
          options={{
            tabBarLabel: 'My Taps',
          }}  />
        <Tab.Screen
          name="Unsent Taps"
          component={Unsent}
          options={{
            tabBarLabel: 'Unsent Taps',
          }} />
           <Tab.Screen
          name="TapHistory"
          component={TapHistory}
          options={{
            tabBarLabel: 'Tap History',
          }} />
      </Tab.Navigator>
    );
  }
const TapsTopBar = () => {
    return (
      <Stack.Navigator
      

        initialRouteName="Taps"
        screenOptions={{
          headerStyle: { backgroundColor: '#633689' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen name="TapsTop" component={TapsTop} options={ {headerShown: false} }/>
      </Stack.Navigator>
    )
}

export default TapsTopBar