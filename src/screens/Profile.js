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
        <Image
          style={styles.userImg}
          source={{uri: userData ? userData.userImg || 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=BrflGRbo6QAAX-SHglx&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-Pk6FxXdw7wPRLATTg-jxmuFlAVu1Lm4D2-OWMccy8yw&oe=62488938' : 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=BrflGRbo6QAAX-SHglx&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-Pk6FxXdw7wPRLATTg-jxmuFlAVu1Lm4D2-OWMccy8yw&oe=62488938'}}
        />

        <Text style={styles.userName}>{userData ? userData.fullName : 'Sample Name'}</Text>

        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}

        <Text style={styles.aboutUser}>{userData ? userData.status : 'Unknown'}</Text>

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
              <Text style={{ color: "#333", marginLeft: 20, fontSize: 18 }}>
                {userData ? userData.email : 'Email Address'}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#235b93" size={25} />
              <Text style={{ color: "#333", marginLeft: 20, fontSize: 18 }}>
                {userData ? userData.phone : 'Phone Number'}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="book-open-blank-variant" color="#235b93" size={25} />
              <Text style={{ color: "#333", marginLeft: 20, fontSize: 18 }}>
                {userData ? userData.course : 'Course'}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="office-building-marker" color="#235b93" size={25} />
              <Text style={{ color: "#333", marginLeft: 20, fontSize: 18 }}>
                {userData ? userData.department : 'Department'}
              </Text>
            </View>
            <View style={styles.row}>
              <FontAwesome5 name="school" color="#235b93" size={21} />
              <Text style={{ color: "#333", marginLeft: 20, fontSize: 18 }}>
                {userData ? userData.organization : 'School'}
              </Text>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 170,
    width: 170,
    borderRadius: 75,
  },
  userName: {
    color: '#222',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff3842',
    textAlign: 'center',
    marginBottom: 20,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  userBtn: {
    borderColor: '#235b93',
    borderWidth: 3,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  userBtnTxt: {
    color: '#222',
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