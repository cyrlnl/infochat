import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function HeaderImage({ route }) {

  const user = auth().currentUser;
  console.log(user);
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


  return (
    <View style={{ flexDirection: 'row' }} >
      <Image
        style={{
          height: 38,
          width: 38,
          borderRadius: 50,
          left: 15
        }}
        source={{ uri: userData ? userData.userImg || 'https://i.ibb.co/cFT4yk9/1.png' : 'https://i.ibb.co/cFT4yk9/1.png' }}
      />
      {/* https://cdn-icons.flaticon.com/png/512/3586/premium/3586930.png?token=exp=1647433052~hmac=a2a55d5304c7070893f42f605984a242 */}
      {/* https://cdn-icons-png.flaticon.com/512/149/149071.png */}
      <Text style={{ left: 25, top: 7, color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 15 }}>{userData ? userData.fullName : 'Welcome to GC InfoChat'}</Text>
    </View>
  )
}