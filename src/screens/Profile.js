import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, ScrollView, Alert, ActivityIndicator, Text, TouchableOpacity, Button } from "react-native";
import auth from '@react-native-firebase/auth';

import { colors } from '../constants';
import { Account } from '../services'

// service
import { Auth } from '../services'

const Profile = () => {

  // const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const user = auth().currentUser;
  console.log(user);

  // useEffect(() => {
  //   Account.getProfile()
  //     .then(acc =>
  //       setUser(acc),
  //       setLoading(false)
  //     )
  //     .catch(err => Alert.alert(err.code, err.message))
  // })

  // if (loading) {
  //   return <ActivityIndicator
  //     color={colors.primary}
  //     size='large'
  //   />
  // }

  // return (
  //   <ScrollView
  //     style={{ flex: 1 }}
  //   >
  //     {/* {
  //       user && user.map((data, index) => (
  //         <View
  //           key={index}
  //           style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
  //         >
  //           <Text>{data.fullName}</Text>
  //           <Text>{data.email}</Text>
  //         </View>
  //       ))
  //     } */}

  //     <TouchableOpacity onPress={() => Auth.signOut()}>
  //     <Text>Sign Out</Text>
  //     </TouchableOpacity>

  //     <Text>{user.email}</Text>
  //     <Text>{user.displayName}</Text>

  //   </ScrollView>
  // )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={StyleSheet.absoluteFill}
          source={require('../assets/gc-logos/gcwallpaper.jpg')}
        />
      </View>
      <Image style={styles.avatar} source={require('../assets/gc-logos/gclogo.png')} />
        <View style={styles.bodyContent}>
          <Text style={styles.textInfo}>
            Name: {user.displayName}
          </Text>
          <Text style={styles.textInfo}>
            Email: {user.email}
          </Text>
          <Text style={styles.textInfo}>Department: CCS</Text>
          <Text style={styles.textInfo}>Program: BSCS</Text>
        </View>
    
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={Auth.signOut}>
          <Text style={styles.text1}>Change Password</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 60
  },
  textInfo: {
    fontSize: 20,
    color: "black",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
    padding: 5,
    margin: 5,
  },
  body: {
    // marginTop: 40,
  },
  bodyContent: {
    // flex: 1,
    // alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  button: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'bottom',
    // elevation: 3,
    backgroundColor: '#5eaed1',
    flexDirection: "row" ,
    marginLeft: 100,
    marginHorizontal: 100, 
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  button1: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 12,
    marginTop: 20,
    // paddingHorizontal: 32,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'bottom',
    // elevation: 3,
    backgroundColor: '#5eaed1',
    flexDirection: "row" ,
    marginLeft: 100,
    marginHorizontal: 100, 
    justifyContent: 'space-evenly'
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});





export default Profile