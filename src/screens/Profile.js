import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, ScrollView, Alert, ActivityIndicator, Text, TouchableOpacity, Button, SafeAreaView } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { colors } from '../constants';
import { Account } from '../services'

// service
import { Auth } from '../services'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, {justifyContent: 'center', alignItems: 'center'}]}>
          <Image
            style={styles.userCoverPhoto}
            source={{ uri: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/125995205_3559319607478017_4764283917276019832_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeFGT7AK63oGFevcVHyMPMtNeJ796IOPVsh4nv3og49WyBhnMXxtKNbdgBcNQs0vJjPG27jAq5BSBPgvEy9jSJcm&_nc_ohc=38Lw2ftyg3kAX-q_BVS&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-INkGba28qYYGd_KzK2XtX3d_2GXtZBmriUMJYM2aoBg&oe=6248D3E4' }}
          />

          <Image
            style={styles.userImg}
            source={{ uri: userData ? userData.userImg || 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=BrflGRbo6QAAX-SHglx&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-Pk6FxXdw7wPRLATTg-jxmuFlAVu1Lm4D2-OWMccy8yw&oe=62488938' : 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=BrflGRbo6QAAX-SHglx&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-Pk6FxXdw7wPRLATTg-jxmuFlAVu1Lm4D2-OWMccy8yw&oe=62488938' }}
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
                <Text style={{ color: "#333", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 18 }}>
                  {userData ? userData.email : 'Email Address'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="phone" color="#235b93" size={25} />
                <Text style={{ color: "#333", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 18 }}>
                  {userData ? userData.phone : 'Phone Number'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="book-open-blank-variant" color="#235b93" size={25} />
                <Text style={{ color: "#333", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 18 }}>
                  {userData ? userData.course : 'Course'}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="office-building-marker" color="#235b93" size={25} />
                <Text style={{ color: "#333", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 18 }}>
                  {userData ? userData.department : 'Department'}
                </Text>
              </View>
              <View style={styles.row}>
                <FontAwesome5 name="school" color="#235b93" size={21} />
                <Text style={{ color: "#333", marginLeft: 15, fontFamily: 'Poppins-Medium', fontSize: 18 }}>
                  {userData ? userData.organization : 'School'}
                </Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
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
    justifyContent: 'flex-end',
    padding: 2,
    // paddingHorizontal: 20,
    paddingBottom: -20
  },
  footer: {
    flex: 3,
    backgroundColor: '#f2f2f2',
    borderColor: '#235b93',
    borderWidth: 3,
    borderBottomColor: '#f2f2f2',
    // borderRadius: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  userImg: {
    height: 170,
    width: 170,
    borderRadius: 90,
    borderWidth: 1.5,
    borderColor: '#949494',
    // borderColor: '#3dc2ff',
    bottom: 105
  },
  userCoverPhoto: {
    height: 160,
    width: 390,
    borderRadius: 5,
    borderWidth: .5,
    borderColor: '#009e05',
    opacity: 1

  },
  userName: {
    color: '#222',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -90,
    marginBottom: 5,
  },
  aboutUser: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: '#ff3842',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  userBtn: {
    borderColor: '#235b93',
    // backgroundColor: '#5cacd4',
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  userBtnTxt: {
    color: '#222',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    // fontWeight: 'bold',
    marginLeft: 5
  },
  userInfoWrapper: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
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
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
});


export default Profile