import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Chatbot } from "../screens";
import { Profile } from "../screens";
import { About } from "../screens";
import { EditProfile } from "../screens";
import HeaderImage from '../components/HeaderImage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = ({ navigation, route }) => {

  const user = auth().currentUser;
  console.log(user);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const isFocused = useIsFocused();

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      })
  }

  const getUserInfo = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      })
  }

  useEffect(() => {
    getUser();
    getUserInfo();
  }, [isFocused])

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
            fontFamily: 'Poppins-Bold',
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
        // unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#235b93',
          height: 55,
        },

      }}
    >
      <Tab.Screen
        name='Chatbot'
        component={Chatbot}
        initialParams={{
          name: user.displayName,
          id: user.uid,
        }}
        // unmountOnBlur={true}
        options={{
          tabBarHideOnKeyboard: true,
          title: 'GC Infochat',
          headerStyle: {
            backgroundColor: '#235b93',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            top: 2,
            color: 'white'
          },
          headerLeft: () => <Icon name="robot" size={27} color="#fff" style={{ marginHorizontal: 3, left: 7 }} />,
          headerRight: () => <HeaderImage/>
            // <View style={{ flexDirection: 'row' }} >
            //   <Text style={{ right: 10, top: 10, color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 13 }}>{userData ? userData.fullName : ''}</Text>
            //   <Image
            //     style={{
            //       height: 38,
            //       width: 38,
            //       borderRadius: 50,
            //       right: 5
            //     }}
            //     source={{ uri: userData ? userData.userImg || 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=9q3OkfWUc_gAX_sTuFw&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-AwEMc8LQBJkJVUgohYIdh0jhT99EXJ3kGBIsTGoDUUw&oe=62604438' : 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=9q3OkfWUc_gAX_sTuFw&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-AwEMc8LQBJkJVUgohYIdh0jhT99EXJ3kGBIsTGoDUUw&oe=62604438' }}
            //   />
            //   {/* https://cdn-icons.flaticon.com/png/512/3586/premium/3586930.png?token=exp=1647433052~hmac=a2a55d5304c7070893f42f605984a242 */}
            //   {/* https://cdn-icons-png.flaticon.com/512/149/149071.png */}
            // </View>
          ,
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
              <Text style={{ color: focused ? '#3dc2ff' : '#c0c4c4', fontFamily: 'Poppins-Bold', fontSize: 12, top: 1 }}>CHAT</Text>
            </View>
          )
        }}


      />
      <Tab.Screen name='Profile' component={ProfileStack}
        options={{
          // unmountOnBlur: true,
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
              <Text style={{ color: focused ? '#3dc2ff' : '#c0c4c4', fontFamily: 'Poppins-Bold', fontSize: 12, top: 1 }}>PROFILE</Text>
            </View>
          )
        }}
      />
      <Tab.Screen name='About' component={About}
        options={{
          // unmountOnBlur: true,
          title: 'About',
          headerStyle: {
            backgroundColor: '#235b93',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
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
              <Text style={{ color: focused ? '#3dc2ff' : '#c0c4c4', fontFamily: 'Poppins-Bold', fontSize: 12, top: 1 }}>ABOUT</Text>
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