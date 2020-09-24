import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import RegistrationScreen from '../screens/RegistrationScreen'

const Stack = createStackNavigator();
function LoginStack() {
  return (
  <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={ {headerShown: false} }
       />
      <Stack.Screen 
        name="Registration" 
        component={RegistrationScreen} 
        options={ {headerShown: false} }
      />
  </Stack.Navigator>
  )
}

export default LoginStack;