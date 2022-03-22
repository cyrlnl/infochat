import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, SignUp, ForgotPassword, OnboardingScreen } from "../screens";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'OnboardingScreen';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerShown: null
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{
          title: 'Forgot Password'
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  )

}

export default AuthNavigator