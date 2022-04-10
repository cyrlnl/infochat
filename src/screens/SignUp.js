import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  // Button,
  StyleSheet
} from 'react-native';

import { Button } from 'react-native-elements';

// services
import { Auth } from '../services'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import colors from '../constants/colors';
import Buttons from '../components/Button';
import Input from '../components/Input';
import Social from '../components/SocialButton';
import terms from '../components/Terms';
import CheckBox from '@react-native-community/checkbox';
const SignUp = ({ navigation }) => {

  const [errors, setErrors] = useState({});

  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPass, setConfirmPass] = useState()
  const [loading, setLoading] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [complianceModal, setComplianceModal] = useState(true);

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

  const validate = () => {
    Keyboard.dismiss();
    setLoading(true)
    let isValid = true;

    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!userName) {
      handleError('Please input fullName', 'fullName');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      handleError('Password should be min 8 char and max 20 char', 'password');
      isValid = false;
    } else if (password !== confirmPass) {
      handleError('Password and confirm password should be same.', 'password');
      isValid = false;
    }

    if (!confirmPass) {
      handleError('Please input confirm password', 'confirmPass');
      isValid = false;
    } else if (confirmPass.length < 8 || confirmPass.length > 20) {
      handleError('Confirm Password should be min 8 char and max 20 char', 'confirmPass');
      isValid = false;
    } else if (confirmPass !== password) {
      handleError('Password and confirm password should be same.', 'confirmPass');
      isValid = false;
    }

    if (isValid) {
      Auth.signUp(userName, email, password)
    } else {
      setLoading(false)
    }
  };


  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>

      <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={complianceModal}
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={{ marginBottom: 10, color: '#235b93', textAlign: 'center', fontSize: 22, fontFamily: 'Poppins-Regular' }}>Terms and Conditions</Text>
                <Text style={[styles.text, { textAlign: 'justify' }]}>{terms}</Text>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    style={styles.checkbox}
                    tintColors={{ true: '#235b93', false: 'black' }}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                  />
                  <Text style={styles.text}>Yes, I agree.</Text>
                </View>

                <Button
                  title="Continue to the register"
                  icon={{
                    name: 'arrow-right',
                    type: 'font-awesome',
                    size: 16,
                    color: 'white',
                  }}
                  iconContainerStyle={{ left: -10 }}
                  iconRight
                  titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, color: '#fff', }}
                  buttonStyle={{
                    backgroundColor: toggleCheckBox ? '#235b93' : '#999',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 20,
                  }}
                  containerStyle={{
                    width: 250,
                    marginVertical: 30,
                    marginBottom: 10
                  }}
                  disabled={!toggleCheckBox}
                  onPress={() => setComplianceModal(false)}
                />

                <Button
                  title="Back to the login"
                  icon={{
                    name: 'arrow-left',
                    type: 'font-awesome',
                    size: 16,
                    color: 'white',
                  }}
                  iconContainerStyle={{ left: -10 }}
                  iconLeft
                  titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 15, color: '#fff', }}
                  buttonStyle={{
                    backgroundColor: '#235b93',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 20,
                  }}
                  containerStyle={{
                    width: 240,
                    marginVertical: 5,
                    marginBottom: 10
                  }}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 20 }}>

        <Text style={{ color: colors.black, fontSize: 40, fontFamily: 'Poppins-Medium', }}>
          Register
        </Text>

        <Text style={{ color: colors.facebook, fontSize: 18, fontFamily: 'Poppins-Regular', marginVertical: -5 }}>
          Enter Your Details to Register
        </Text>

        <View style={{ marginVertical: 20 }}>

          <Input
            // onChangeText={text => handleOnchange(text, 'email')}
            value={email}
            onChangeText={e => setEmail(e)}
            onFocus={() => handleError(null, 'email')}
            keyboardType="email-address"
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            // onChangeText={text => handleOnchange(text, 'fullName')}
            value={userName}
            onChangeText={e => setUserName(e)}
            onFocus={() => handleError(null, 'fullName')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullName}
          />


          <Input
            // onChangeText={text => handleOnchange(text, 'password')}
            value={password}
            onChangeText={e => setPassword(e)}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Input
            // onChangeText={text => handleOnchange(text, 'password')}
            value={confirmPass}
            onChangeText={e => setConfirmPass(e)}
            onFocus={() => handleError(null, 'confirmPass')}
            iconName="lock-open-check-outline"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            error={errors.confirmPass}
            password
          />


          <Buttons title="Register" onPress={validate} />

          <Text
            style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 15, color: 'black', bottom: 5 }}
          >
            -- OR --
          </Text>

          <Social
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#f5e7ea"
            backgroundColor="#de4d41"
            onPress={() => Auth.googleSignUp()}
          />

          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: colors.black,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              fontSize: 16,
              top: 15
            }}>
            Already have account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    alignItems: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: -20,
    alignItems: 'center'
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  continueButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333'
  }
});

export default SignUp;