import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';
import { colors } from '../constants';
import { Button, Input, TextButton, SocialButton } from '../components';

// service
import { Auth } from '../services'

export default Login = ({ navigation }) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.heading}>GC InfoChat</Text>
      <Text style={styles.heading1}>Login your account here</Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={e => setEmail(e)}
      />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={e => setPassword(e)}
      />

      <TextButton
        text="Forgot Password?"
        onPress={() => navigation.navigate('ForgetPassword')}
      />

      <Button
        buttonText="Login"
        onPress={() => Auth.signIn(email, password)}
      />

      <SocialButton
        buttonText="Google Sign In"
        backgroundColor={colors.google}
        onPress={() => Auth.googleLogin()}
      />

      <TextButton
        text="Not registered yet? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#98cce3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    color: '#262626',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 35,
  },
  heading1: {
    color: '#262626',
    fontSize: 18,
    bottom: 10,
  },
  logo: {
    top: 30,
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
})