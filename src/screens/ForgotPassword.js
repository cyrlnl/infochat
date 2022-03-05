import React, { useState } from 'react';
import { View, Keyboard, Dimensions, SafeAreaView, Text, Alert } from 'react-native';
import { colors } from '../constants';
import { Button, Input, TextButton } from '../components';
// services
import { Auth } from '../services'

const { width, height } = Dimensions.get('window');

const ForgotPassword = ({ navigation }) => {

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();

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
    
    if (isValid) {
      Auth.forgotPassword(email);
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

	return (
		<SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>

			<View style={{ paddingTop: 50, paddingHorizontal: 20 }}>

				<Text style={{ color: colors.black, fontSize: 40, fontWeight: 'bold' }}>
					Forgot Password
				</Text>
				<Text style={{ color: colors.facebook, fontSize: 15, fontWeight: 'bold', marginVertical: 10 }}>
					Enter your registered E-mail to reset your password.
				</Text>

				<View style={{ marginVertical: 50 }}>

					<Input
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
						style={{ fontSize: 18 }}
					/>

					<Button
						title="Forget Password"
						onPress={validate}
					/>

					<Text
						onPress={() => navigation.navigate('Login')}
						style={{
							color: colors.google,
							fontWeight: 'bold',
							textAlign: 'center',
							fontSize: 16,
							marginVertical: 30
						}}>
						Go back to Login
					</Text>

				</View>
			</View>
		</SafeAreaView >
	)
}

export default ForgotPassword;