import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { colors } from '../constants';
import { Button, Input, TextButton } from '../components';
// services
import { Auth } from '../services'

const { width, height } = Dimensions.get('window');

export default SignUp = ({ navigation }) => {

	const [userName, setUserName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	return (
		<View style={styles.container}>

			<Image
				source={require('../assets/logo.png')}
				style={styles.logo}
			/>
			<Text style={styles.heading}>GC InfoChat</Text>
			<Text style={styles.heading1}>Register an account here.</Text>
			<Input
				placeholder="Full Name"
				value={userName}
				onChangeText={e => setUserName(e)}
			/>
			<Input
				placeholder="Email"
				value={email}
				onChangeText={e => setEmail(e)}
			/>
			<Input
				placeholder="Password"
				secureTextEntry={true}
				value={password}
				onChangeText={e => setPassword(e)}
			/>

			<Button
				buttonText="Sign Up"
				onPress={() => Auth.signUp(userName, email, password)}
			/>

			<TextButton
				text="Have an account? Login"
				onPress={() => navigation.navigate('Login')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height,
		width,
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