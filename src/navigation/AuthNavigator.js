import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, SignUp, ForgetPassword } from "../screens";

const Stack = createNativeStackNavigator();

export default AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: null
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
    <Stack.Screen
      options={{ 
        title: 'Sign Up Form', 
        headerStyle: {
          backgroundColor: '#98cce3',
        } 
      }}
      name="SignUp"
      component={SignUp}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPassword}
    />
  </Stack.Navigator>
)