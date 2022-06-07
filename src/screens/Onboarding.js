import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
	let backgroundColor;

	backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

	return (
		<View
			style={{
				width: 10,
				height: 10,
				borderRadius: 10,
				marginHorizontal: 3,
				backgroundColor
			}}
		/>
	);
}

const Skip = ({ ...props }) => (
	<Text
		style={{
			color: "#fff",
			marginHorizontal: 5,
			fontSize: 18,
			fontFamily: 'Poppins-Medium'
		}}
		{...props}
	>Skip</Text>
)

const Next = ({ ...props }) => (
	<Text
		style={{
			color: "#fff",
			marginHorizontal: 5,
			fontSize: 18,
			fontFamily: 'Poppins-Medium'
		}}
		{...props}
	>Next</Text>
)

const Done = ({ ...props }) => (
	<Text
		style={{
			color: "#fff",
			marginHorizontal: 7,
			fontSize: 18,
			fontFamily: 'Poppins-Medium'
		}}
		{...props}
	>GET STARTED</Text>
)


const OnboardingScreen = ({ navigation }) => {
	return (
		<Onboarding
			SkipButtonComponent={Skip}
			NextButtonComponent={Next}
			DoneButtonComponent={Done}
			DotComponent={Dots}
			onSkip={() => navigation.replace("Login")}
			onDone={() => navigation.navigate("Login")}
			pages={[
				{
					backgroundColor: '#27a77f',
					image: <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('../assets/onboarding/onboard1.png')} />,
					title: <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 24, textAlign: 'center', color: '#fff', top: -60 }}>Interactive</Text>,
					subtitle: <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, textAlign: 'center', color: '#fff', top: -60 }}>Interact with the Gordon College</Text>,
				},
				{
					backgroundColor: '#27a77f',
					image: <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('../assets/onboarding/onboard2.png')} />,
					title: <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 24, textAlign: 'center', color: '#fff', top: -60 }}>Inquire</Text>,
					subtitle: <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, textAlign: 'center', color: '#fff', top: -60 }}>Ask whenever and wherever you are.</Text>,
				},
				{
					backgroundColor: '#27a77f',
					image: <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('../assets/onboarding/onboard3.png')} />,
					title: <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 24, textAlign: 'center', color: '#fff', top: -30 }}>User-friendly Chatbot</Text>,
					subtitle: <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, textAlign: 'center', color: '#fff', top: -30 }}>Talk to the chat bot to answer your{'\n'}queries instantly.</Text>,
				},
			]}
		/>
	)
}


export default OnboardingScreen;