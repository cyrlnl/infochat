import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

// services
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Auth } from '../services'

import colors from '../constants/colors';
import Buttons from '../components/Button';
import Input from '../components/Input';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUp = ({ navigation }) => {

  const [errors, setErrors] = useState({});

  const [userName, setUsername] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [department, setDepartment] = useState()
  const [course, setCourse] = useState()
  const [organization, setOrganization] = useState()
  const [password, setPassword] = useState()
  const [confirmPass, setConfirmPass] = useState()
  const [loading, setLoading] = useState(false)


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
      handleError('Please input E-mail', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid E-mail', 'email');
      isValid = false;
    }

    if (!userName) {
      handleError('Please input Full Name', 'fullName');
      isValid = false;
    }

    if (!password) {
      handleError('Please input Password', 'password');
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      handleError('Password should be min of 8 char and max 20 char', 'password');
      isValid = false;
    } else if (password !== confirmPass) {
      handleError('Password and Confirm Password should be same.', 'password');
      isValid = false;
    }

    if (!confirmPass) {
      handleError('Please input Confirm Password', 'confirmPass');
      isValid = false;
    } else if (confirmPass.length < 8 || confirmPass.length > 20) {
      handleError('Confirm Password should be min 8 char and max 20 char', 'confirmPass');
      isValid = false;
    } else if (confirmPass !== password) {
      handleError('Password and Confirm Password should be same.', 'confirmPass');
      isValid = false;
    }

    if (isValid) {
      Auth.signUp(userName, email, password, phone, department, course, organization)
    } else {
      setLoading(false)
    }
  };


  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>

      <ScrollView
        contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 20 }}>

        <Text style={{ color: '#2c8162', fontSize: 40, fontFamily: 'Poppins-Medium', }}>
          Register
        </Text>

        <Text style={{ color: colors.black, fontSize: 14, fontFamily: 'Poppins-Regular', marginVertical: -5 }}>
          Enter Your Details to Register
        </Text>

        <View style={{ marginVertical: 20 }}>

          <Input
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
            value={userName}
            onChangeText={e => setUsername(e)}
            onFocus={() => handleError(null, 'fullName')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullName}
          />

          <Input
            value={phone}
            onChangeText={e => setPhone(e)}
            onFocus={() => handleError(null, 'phone')}
            iconName="cellphone"
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="number-pad"
            error={errors.phone}
          />

          <Input
            value={department}
            onChangeText={e => setDepartment(e)}
            onFocus={() => handleError(null, 'department')}
            iconName="office-building-outline"
            label="Department (Optional)"
            placeholder="Enter your department"
            error={errors.department}
          />

          <Input
            value={course}
            onChangeText={e => setCourse(e)}
            onFocus={() => handleError(null, 'course')}
            iconName="book-open-outline"
            label="Course (Optional)"
            placeholder="Enter your course"
            error={errors.course}
          />

          <Input
            value={organization}
            onChangeText={e => setOrganization(e)}
            onFocus={() => handleError(null, 'organization')}
            iconName="office-building-marker-outline"
            label="Organization (Optional)"
            placeholder="Enter your organization"
            error={errors.organization}
          />

          <Input
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
            onPress={() => navigation.navigate('Login')}
            style={{
              color: colors.black,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
              fontSize: 16,
              top: 10
            }}>
            Already have an account? Sign In
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  statusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#235b93',
    alignItems: 'center',
    marginTop: 10,
  }
});

export default SignUp;
