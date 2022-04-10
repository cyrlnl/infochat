import React, { useState } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, Keyboard, Image, TouchableOpacity, StyleSheet, ImageBackground, Alert, ScrollView } from 'react-native';
import colors from '../constants/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Social from '../components/SocialButton'

import { windowHeight, windowWidth } from '../utils/Dimensions';

// service
import { Auth } from '../services'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

  const user = auth().currentUser;

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator
          animating={true}
          size="large"
          color="#265d94" />
        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 20 }}>Loading. Please wait...</Text>
      </View>

    )
  }
  // LOGIN AUTHENTICATION 
  const userLogin = async () => {
    setLoading(true)
    try {
      await auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
          Alert.alert(
            "Warning",
            "something went wrong",
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          )
        })
      setLoading(false)
    } catch (err) {
      Alert.alert(
        "Warning",
        "something went wrong",
      )
      setLoading(false)
    }

  }
  const signIn = async () => {
    setLoading(true)
    try {
      await auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            Alert.alert('There is no user record. The user may have been deleted. Try again.');
            console.log('There is no user record. The user may have been deleted.');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
            console.log('That email address is invalid!');
          }
          if (error.code === 'auth/wrong-password') {
            Alert.alert('The password is invalid or the user does not have a password.');
            console.log('The password is invalid or the user does not have a password.');
          }
          if (error.code === 'auth/too-many-requests') {
            Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later.');
            console.log('We have blocked all requests from this device due to unusual activity. Try again later.');
          }
          console.error(error);
        });
      setLoading(false)
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('There is no user record. The user may have been deleted. Try again.');
        console.log('There is no user record. The user may have been deleted.');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
        console.log('That email address is invalid!');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('The password is invalid or the user does not have a password.');
        console.log('The password is invalid or the user does not have a password.');
      }
      if (error.code === 'auth/too-many-requests') {
        Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later.');
        console.log('We have blocked all requests from this device due to unusual activity. Try again later.');
      }
      console.error(error);
      // return Alert.alert(err.code, err.message)
    }
  }

  const validate = async () => {
    Keyboard.dismiss();
    // setLoading(true)
    let isValid = true;
    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      signIn();
      // Auth.signIn(email, password)
      // setLoading(false)
      // } else {
      //   setLoading(false)
    }

  };


  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/bg7.png')}
          resizeMode="cover"
          imageStyle={{
            flex: 1,
            width: windowWidth,
            height: windowHeight,
            // width: 550,
            // height: 300,
            justifyContent: "center",
            opacity: 0.8
          }}
        >
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../assets/logo.png')}
            />
          </View>

          <View style={styles.footer}>

            <Text style={{ color: colors.black, fontSize: 18, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
              Login your Credentials
            </Text>

            <Input
              // onChangeText={text => handleOnchange(text, 'email')}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
              onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
            />

            <Input
              // onChangeText={text => handleOnchange(text, 'password')}
              onChangeText={text => setPassword(text)}
              value={password}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />

            <TouchableOpacity
              style={{
                // width: windowWidth - 20,
                // left: 100, 
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text
                style={{
                  textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, color: colors.google
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Log In"
              btnType="login"
              color="#f5e7ea"
              onPress={validate}
            />

            <Text
              style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 15, color: 'black', bottom: 5 }}
            >
              -- OR --
            </Text>

            <Social
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#f5e7ea"
              backgroundColor="#de4d41"
              onPress={() => Auth.googleSignIn()}
            />

            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{
                color: colors.black,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                fontSize: 16,
                top: 20
              }}>
              Don't have account? Register
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 2,
    // paddingHorizontal: 20,
    // paddingBottom: -20
  },
  footer: {
    // flex: 1,
    backgroundColor: '#fff',
    // borderColor: '#3880ff',
    // borderWidth: 3,
    // borderBottomColor: '#3880ff',
    // borderRadius: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    // marginHorizontal: 1,
    // marginVertical: 20,
    paddingVertical: 20,
    paddingBottom: 50,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 180,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#235b93',
    marginVertical: 15,
    // borderColor: '#235b93',
    // bottom: 135,
    marginBottom: 15,
  },
})

export default Login;