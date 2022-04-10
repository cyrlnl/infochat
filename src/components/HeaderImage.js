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
      <Text style={{ right: 15, top: 10, color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 13 }}>{userData ? userData.fullName : ''}</Text>
      <Image
        style={{
          height: 38,
          width: 38,
          borderRadius: 50,
          right: 10
        }}
        source={{ uri: userData ? userData.userImg || 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=9q3OkfWUc_gAX_sTuFw&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-AwEMc8LQBJkJVUgohYIdh0jhT99EXJ3kGBIsTGoDUUw&oe=62604438' : 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=9q3OkfWUc_gAX_sTuFw&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-AwEMc8LQBJkJVUgohYIdh0jhT99EXJ3kGBIsTGoDUUw&oe=62604438' }}
      />
      {/* https://cdn-icons.flaticon.com/png/512/3586/premium/3586930.png?token=exp=1647433052~hmac=a2a55d5304c7070893f42f605984a242 */}
      {/* https://cdn-icons-png.flaticon.com/512/149/149071.png */}
    </View>
  )
}