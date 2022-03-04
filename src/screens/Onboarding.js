import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const Dot = (selected) => {
	let backgroundColor;

	backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

	return (
		<View
			style={{
				width: 5,
				height: 5,
				borderRadius: 5,
				marginHorizontal: 3,
				backgroundColor
			}}
		/>
	)
}

const Skip = ({ ...props }) => (
	<Text
		style={{
			color: "#000",
			marginHorizontal: 5,
			fontSize: 16,
		}}
		{...props}
	>Skip</Text>
)

const Next = ({ ...props }) => (
	<Text
		style={{
			color: "#000",
			marginHorizontal: 5,
			fontSize: 16,
		}}
		{...props}
	>Next</Text>
)

const Done = ({ ...props }) => (
	<Text
		style={{
			color: "#000",
			marginHorizontal: 7,
			fontSize: 18,
		}}
		{...props}
	>DONE</Text>
)


const OnboardingScreen = ({ navigation }) => {
	return (
		<Onboarding
			SkipButtonComponent={Skip}
			NextButtonComponent={Next}
			DoneButtonComponent={Done}
			DotComponent={Dot}
			onSkip={() => navigation.replace("Login")}
			onDone={() => navigation.navigate("Login")}
			pages={[
				{
					backgroundColor: '#fff',
					image: <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('../assets/onboarding/Interaction.png')} />,
					title: 'Interaction',
					subtitle: 'Interact with the Gordon College',
				},
				{
					backgroundColor: '#fff',
					image: <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('../assets/onboarding/Internet.png')} />,
					title: 'Inquire',
					subtitle: 'Ask whenever and wherever you are.',
				},
				{
					backgroundColor: '#fff',
					image: <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('../assets/onboarding/Chatbot.png')} />,
					title: 'User-friendly Chatbot',
					subtitle: 'Talk to the chat bot to answer your queries instantly.',
				},
			]}
		/>
	)
}


export default OnboardingScreen;