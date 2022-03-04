// import React, { useState } from 'react';
// import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
// import { colors } from '../constants';
// import { Button, Input, TextButton } from '../components';
// // services
// import { Auth } from '../services'

// const { width, height } = Dimensions.get('window');

// export default SignUp = ({ navigation }) => {

// 	const [userName, setUserName] = useState()
// 	const [email, setEmail] = useState()
// 	const [password, setPassword] = useState()

// 	return (
// 		<View style={styles.container}>

// 			<Image
// 				source={require('../assets/logo.png')}
// 				style={styles.logo}
// 			/>
// 			<Text style={styles.heading}>GC InfoChat</Text>
// 			<Text style={styles.heading1}>Register an account here.</Text>
// 			<Input
// 				placeholder="Full Name"
// 				value={userName}
// 				onChangeText={e => setUserName(e)}
// 			/>
// 			<Input
// 				placeholder="Email"
// 				value={email}
// 				onChangeText={e => setEmail(e)}
// 			/>
// 			<Input
// 				placeholder="Password"
// 				secureTextEntry={true}
// 				value={password}
// 				onChangeText={e => setPassword(e)}
// 			/>

// 			<Button
// 				buttonText="Sign Up"
// 				onPress={() => Auth.signUp(userName, email, password)}
// 			/>

// 			<TextButton
// 				text="Have an account? Login"
// 				onPress={() => navigation.navigate('Login')}
// 			/>
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		height,
// 		width,
// 		flex: 1,
// 		backgroundColor: '#98cce3',
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	},
// 	heading: {
//     color: '#262626',
//     fontSize: 30,
//     fontWeight: 'bold',
//     paddingVertical: 35,
//   },
//   heading1: {
//     color: '#262626',
//     fontSize: 18,
//     bottom: 10,
//   },
//   logo: {
//     top: 30,
//     height: 150,
//     width: 150,
//     resizeMode: 'cover',
//   },
// })

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

// services
import { Auth } from '../services'

import colors from '../constants/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Social from '../components/SocialButton';
import Loader from '../components/Loader';

const SignUp = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: '',
    fullName: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [status, setStatus] = useState()

  const validate = () => {
    Keyboard.dismiss();
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

    if (!status) {
      handleError('Please input status', 'status');
      isValid = false;
    }

    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 5) {
      handleError('Minimum password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      Auth.signUp(userName, status, email, password)
    }
  };


  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>

      <ScrollView
        contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 20 }}>

        <Text style={{ color: colors.black, fontSize: 40, fontWeight: 'bold' }}>
          Register
        </Text>

        <Text style={{ color: colors.facebook, fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
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
            // onChangeText={text => handleOnchange(text, 'fullName')}
            value={status}
            onChangeText={e => setStatus(e)}
            onFocus={() => handleError(null, 'status')}
            iconName="list-status"
            label="Status"
            placeholder="Student or Guest"
            error={errors.status}
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
          <Button title="Register" onPress={validate} />

          <Text
            style={{ left: 150, fontWeight: 'bold', fontSize: 15, color: 'black' }}
          >
            -- OR --
          </Text>

          <Social title="Google Sign Up" onPress={() => Auth.googleSignUp()} />

          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: colors.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;