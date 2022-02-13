import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "../screens";

const Stack = createNativeStackNavigator();

export default AppNavigator = () => (
    <Stack.Navigator
        screenOptions = {{
            headerShown: null
        }}
    >     
        <Stack.Screen 
            name="Home" 
            component= {Home}
        />                  
    </Stack.Navigator> 
)