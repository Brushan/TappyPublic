import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from './LoginStack';
import TabBar from './TabBar';

const Stack = createStackNavigator();
function RootStack() {
    return (
    <Stack.Navigator>
        <Stack.Screen
        name="Login" 
        component={LoginStack}
        options={ {headerShown: false} } />
    <Stack.Screen
        name="bottomNav"
        component={TabBar}
        options={{ headerShown: false }}
    />
    </Stack.Navigator>
    )
}
export default RootStack;