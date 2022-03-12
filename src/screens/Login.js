import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Social from '../components/SocialButton'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// service
import { Auth } from '../services'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

  const user = auth().currentUser;

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

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
      Auth.signIn(email, password)
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

      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>

        <Text style={{ color: colors.black, fontSize: 40, fontWeight: 'bold' }}>
          Log In
        </Text>
        <Text style={{ color: colors.facebook, fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
          Enter Your Details to Sign In
        </Text>

        <View style={{ marginVertical: 20 }}>

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
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text
              style={{ left: 120, fontWeight: 'bold', fontSize: 14, color: colors.google }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Log In"
            onPress={validate}
          />

          <Text
            style={{ left: 150, fontWeight: 'bold', fontSize: 15, color: 'black', bottom: 5 }}
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
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
              top: 15
            }}>
            Don't have account? Register
          </Text>

        </View>
      </View>
    </SafeAreaView >
  );
};

export default Login;