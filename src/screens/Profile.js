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
        source={require('../assets/bg.jpg')}
        style={{
          flex: 1,
          resizeMode: "cover",
          width: '100%',
          height: '100%',
          justifyContent: "center"
        }}
      >

        <View style={styles.header}>

          <Image
            style={styles.userImg}
            source={{ uri: userData ? userData.userImg || 'https://i.ibb.co/Swt3gZP/gclogo.png' : 'https://i.ibb.co/Swt3gZP/gclogo.png' }}
          />

          <Text style={styles.userName}>{userData ? userData.fullName : 'Sample Name'}</Text>

          {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}

          <Text style={styles.aboutUser}>{userData ? userData.status : 'Unknown'}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.userBtnWrapper}>

            <TouchableOpacity style={styles.userBtn} onPress={() => { navigation.navigate('EditProfile') }}>
              <Icon name="account-edit" color="#009e05" size={22} />
              <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userBtn} onPress={() => Auth.signOut()}>
              <AntDesign name="logout" color="#ff3842" size={22} />
              <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="email" color="#235b93" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                  {userData ? userData.email : 'Email Address'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="phone" color="#235b93" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                  {userData ? userData.phone : 'Phone Number'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="book-open-blank-variant" color="#235b93" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                  {userData ? userData.course : 'Course'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="office-building-marker" color="#235b93" size={25} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                  {userData ? userData.department : 'Department'}
                </Text>
              </View>
              <View style={styles.row}>
                <FontAwesome5 name="school" color="#235b93" size={21} />
                <Text style={{ color: "#222", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                  {userData ? userData.organization : 'School'}
                </Text>
              </View>
            </View>
          </View>
        </View>



      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // padding: 2,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    paddingVertical: 20,
    // marginBottom: 10,
    bottom: 10,
    marginTop: -70,
    // marginBottom: 50
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 90,
    borderWidth: 0.5,
    borderColor: '#444',
    marginBottom: 10
  },
  userCoverPhoto: {
    height: 160,
    width: 400,
    borderRadius: 5,
    borderWidth: .5,
    borderColor: '#009e05',
    opacity: 0

  },
  userName: {
    color: '#f2f2f2',
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
  },
  aboutUser: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#f2f2f2',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  userBtn: {
    borderColor: '#235b93',
    backgroundColor: '#f2f2f2',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  userBtnTxt: {
    color: '#333',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginLeft: 5
  },
  userInfoWrapper: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // marginVertical: 20,
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
    paddingHorizontal: 25,
    // marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 35,
  },
});


export default Profile