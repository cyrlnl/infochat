import React, { useState } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, Keyboard, Image, TouchableOpacity, StyleSheet, ImageBackground, Alert, ScrollView } from 'react-native';

import Reminder from '../screens/Reminder';
import Terms from '../components/TermsCondition';
import TermsButton from '../components/TermsButtonModal';
import colors from '../constants/colors';
import Buttons from '../components/Button';
import Input from '../components/Input';
import Social from '../components/SocialButton'


// service
import { Auth } from '../services'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

  const user = auth().currentUser;

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
          color="#38a67e" />
        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 20 }}>Loading. Please wait...</Text>
      </View>

    )
  }
  // LOGIN AUTHENTICATION 
  const signIn = async () => {
    setLoading(true)
    try {
      const user = await auth().signInWithEmailAndPassword(email, password)

      auth().onAuthStateChanged(function (user) {
        if (user) {
          if (user.emailVerified === false) {
            Alert.alert(
              'ACCESS DENIED',
              "It looks like you haven't verified your e-mail address yet. Please check your inbox and verify yourself. Thank you."
            );
            auth().signOut();
          } else {
            // successful login 
            // Alert.alert('You Are verified');
            navigation.navigate('Chatbot');
          }
        }
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
    }

  };


  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#38a67e' }}>

      <ScrollView contentContainerStyle={{}}>
        <Terms />
        <Reminder />
        <View style={styles.header}>

          <Image
            resizeMode="cover"
            style={styles.logo}
            source={require('../assets/app_logo/1.png')}
          />
        </View>

        <View style={styles.footer}>
          <Text style={{ color: colors.black, fontSize: 18, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
            Login your Credentials
          </Text>

          <Input
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
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text
              style={{
                textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, color: 'black'
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Buttons
            title="Log In"
            btnType="login"
            color="#f5e7ea"
            onPress={validate}
          />

          <Text
            style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 15, color: 'black', bottom: 5 }}
          >
            OR
          </Text>

          <Social
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#f5e7ea"
            backgroundColor="#de4d41"
            onPress={() => Auth.googleSignUp()}
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
            Don't have an account? Sign Up
          </Text>

          <TermsButton />

          <Text
            style={{
              color: colors.grey,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              fontSize: 16,
              top: 70
            }}>
            Version 1.4
          </Text>
        </View>
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    // marginHorizontal: 1,
    // marginVertical: 20,
    paddingVertical: 20,
    paddingBottom: 160,
    marginLeft: 10,
    marginRight: 10,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 180,
    borderRadius: 100,
    borderWidth: 2,
    // borderColor: '#204D25',
    marginVertical: 15,
    // borderColor: '#235b93',
    // bottom: 135,
    marginBottom: 15,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  }
})

export default Login;