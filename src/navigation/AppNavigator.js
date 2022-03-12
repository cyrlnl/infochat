import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth';

import { Chatbot } from "../screens";
import { Profile } from "../screens";
import { About } from "../screens";
import { EditProfile } from "../screens";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  const user = auth().currentUser;
  // console.log(user);

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
            fontFamily: 'Poppins-SemiBold',
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

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#235b93',
          height: 55,
        }
      }
      }
    >
      <Tab.Screen
        name='Chatbot'
        component={Chatbot}
        initialParams={{
          name: user.displayName,
          id: user.uid,
        }}
        options={{
          tabBarHideOnKeyboard: true,
          title: 'GC InfoChat',
          headerStyle: {
            backgroundColor: '#235b93',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            top: 2,
            color: 'white'
          },
          headerLeft: () => <Icon name="robot" size={35} color="#fff" style={{ marginHorizontal: 3, left: 7 }} />,
          headerRight: () => <Text style={{ right: 10, color: '#fff', fontFamily: 'Poppins-BlackItalic', fontSize: 17, fontStyle: 'italic' }}>{user.displayName}</Text>,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
              <Image
                source={require('../assets/bot-outline.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#fff' : '#92949c'
                }}
              />
              <Text style={{ color: focused ? '#3dc2ff' : '#c0c4c4', fontWeight: 'bold', fontSize: 12, top: 1 }}>CHAT</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name='Profile' component={ProfileStack}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
              <Image
                source={require('../assets/user-outline.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#fff' : '#92949c'
                }}
              />
              <Text style={{ color: focused ? '#3dc2ff' : '#c0c4c4', fontWeight: 'bold', fontSize: 12, top: 1 }}>PROFILE</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name='About' component={About}
        options={{
          title: 'About',
          headerStyle: {
            backgroundColor: '#235b93',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            top: 2,
            color: 'white'
          },
          headerLeft: () => <Icon name="information-outline" size={35} color="#fff" style={{ marginHorizontal: 3, left: 7 }} />,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
              <Image
                source={require('../assets/info-outline.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#fff' : '#92949c'
                }}
              />
              <Text style={{ color: focused ? '#3dc2ff' : '#c0c4c4', fontWeight: 'bold', fontSize: 12, top: 1 }}>ABOUT</Text>
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