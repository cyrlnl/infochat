import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import auth from '@react-native-firebase/auth';

import { Chatbot } from "../screens";
import { Profile } from "../screens";
import { About } from "../screens";
import { EditProfile } from "../screens";
import { SubmitQuery } from "../screens";
import HeaderImage from '../components/HeaderImage';
import SubmitModal from "../screens/SubmitModal";
import Modal from '../screens/ChatbotInstruction';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = ({ navigation, route }) => {

  const user = auth().currentUser;
  console.log(user);

  const ProfileStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarHideOnKeyboard: true,
          title: 'Edit Profile',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            color: 'black'
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );

  const ChatbotStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name='Chatbot'
        component={Chatbot}
        initialParams={{
          name: user.displayName,
          id: user.uid,
        }}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Stack.Screen
        name='SubmitQuery'
        component={SubmitQuery}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      />
    </Stack.Navigator>
  )


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#38a67e',
          marginTop: 4,
          height: 50,
          width: 300,
          left: 46,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        },

      }}
    >
      <Tab.Screen
        name='Chatbot'
        component={ChatbotStack}
        initialParams={{
          name: user.displayName,
          id: user.uid,
        }}
        options={{
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: '#38a67e',
          },
          headerTitleStyle: {
            opacity: 0
          },
          headerRight: () => <View style={{ bottom: 21, flexDirection: 'row' }}><View style={{ right: 50 }}><Modal /></View><View style={{ right: 100 }}><SubmitModal /></View></View>,
          headerLeft: () => <HeaderImage />,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
              <Image
                source={require('../assets/bot.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#fff' : '#267357'
                }}
              />
              <Text style={{ color: focused ? 'white' : '#267357', fontFamily: 'Poppins-Medium', fontSize: 12, top: 1 }}>CHAT</Text>
            </View>
          )
        }}


      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#38a67e',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            top: 2,
            color: 'white'
          },
          headerLeft: () => <Icon name="person-circle-outline" size={35} color="#fff" style={{ marginHorizontal: 3, left: 7 }} />,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
              <Image
                source={require('../assets/usersharp.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#fff' : '#267357'
                }}
              />
              <Text style={{ color: focused ? 'white' : '#267357', fontFamily: 'Poppins-Medium', fontSize: 12, top: 1 }}>PROFILE</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name='About' component={About}
        options={{
          title: 'About',
          headerStyle: {
            backgroundColor: '#38a67e',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            top: 2,
            color: 'white'
          },
          headerLeft: () => <Icon name="information-circle-outline" size={35} color="#fff" style={{ marginHorizontal: 3, left: 7 }} />,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
              <Image
                source={require('../assets/info.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#fff' : '#267357'
                }}
              />
              <Text style={{ color: focused ? 'white' : '#267357', fontFamily: 'Poppins-Medium', fontSize: 12, top: 1 }}>ABOUT</Text>
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default AppNavigator;