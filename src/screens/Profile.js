import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, ScrollView, Alert, ActivityIndicator, Text, TouchableOpacity, Button, SafeAreaView, ImageBackground } from "react-native";
import { useIsFocused } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { windowHeight, windowWidth } from '../utils/Dimensions';


// service
import { Auth } from '../services'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const Profile = ({ navigation, route }) => {

  // const [user, setUser] = useState();
  const user = auth().currentUser;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);


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

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading])

  useIsFocused();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require('../assets/newBG/1.jpg')}
        style={{
          flex: 1,
          resizeMode: "cover",
          width: '100%',
          height: '100%',
          justifyContent: "center"
        }}
      >

        <View style={styles.header}>
          <ImageBackground
            style={styles.userCoverPhoto}
            source={{ uri: 'https://i.ibb.co/njzbFmp/gcwallpaper.jpg' }}
          />
        </View>

        <View style={styles.footer}>
          <View style={{ justifyContent: 'center', marginTop: -60, alignItems: 'center', marginBottom: 10 }}>
            <ImageBackground
              style={{
                height: 135,
                width: 135,
                top: -10
              }}
              imageStyle={{ borderRadius: 90, borderWidth: 1, borderColor: '#9eb2a0', }}
              source={{ uri: userData ? userData.userImg || 'https://i.ibb.co/0ZtX4K7/user-Image.png' : 'https://i.ibb.co/0ZtX4K7/user-Image.png' }}
            >
              <TouchableOpacity style={{
                flex: 1,
                top: -10,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }} onPress={() => { navigation.navigate('EditProfile') }}>
                <View>
                  <Icon
                    name='pencil'
                    size={20}
                    color="#fff"
                    style={{
                      opacity: 0.8,
                      backgroundColor: '#000',
                      borderRadius: 50,
                      padding: 5
                    }}
                  />
                </View>
              </TouchableOpacity>
            </ImageBackground>


            <View style={{ top: 10 }}>
              <Text style={styles.userName}>{userData ? userData.fullName : 'Sample Fullname'}</Text>

              <Text style={styles.aboutUser}>{userData ? userData.status : 'Status'}</Text>
            </View>

          </View>
          <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="email" color="#2c8162" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                  {userData ? userData.email : 'Email Address'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="phone" color="#2c8162" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                  {userData ? userData.phone : 'Phone Number'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="book-open-blank-variant" color="#2c8162" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                  {userData ? userData.course : 'Course'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="office-building-marker" color="#2c8162" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                  {userData ? userData.department : 'Department'}
                </Text>
              </View>
              <View style={styles.row}>
                <FontAwesome5 name="school" color="#2c8162" size={21} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                  {userData ? userData.organization : 'Organization'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.userBtnWrapper}>

            {/* <TouchableOpacity style={styles.userBtn} onPress={() => { navigation.navigate('EditProfile') }}>
          <Icon name="account-edit" color="#009e05" size={22} />
          <Text style={styles.userBtnTxt}>Edit Profile</Text>
        </TouchableOpacity> */}

            <TouchableOpacity style={styles.userBtn} onPress={() => Auth.signOut()}>
              {/* <AntDesign name="logout" color="#ff3842" size={22} /> */}
              <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>

          </View>
        </View>

      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    paddingHorizontal: 40,
    // marginHorizontal: 10,
    // paddingTop: 30,
    // paddingBottom: 40,
    // marginBottom: 10,
    // bottom: 10,
    marginTop: 25,
    // marginBottom: 50
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#9eb2a0'
  },
  userImg: {
    height: 135,
    width: 135,
    borderWidth: 1,
    borderColor: '#9eb2a0',
    borderRadius: 90,
    top: -10
  },
  userCoverPhoto: {
    height: 160,
    width: 400,
    borderRadius: 5,
    borderWidth: .5,
    // borderColor: '#009e05',
    opacity: 0

  },
  userName: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    top: -5
  },
  aboutUser: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    top: -10
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    top: -7
    // marginBottom: 10,
  },
  userBtn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c8162',
    // borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  userBtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    // marginLeft: 5
  },
  userInfoWrapper: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 20,
    // marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});


export default Profile