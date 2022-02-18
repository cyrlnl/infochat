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

const Skip = ({...props}) => (
  <Text
    style={{
      color: "#000",
      marginHorizontal: 5,
      fontSize: 16,
    }}
    { ...props}
  >Skip</Text>
)

const Next = ({...props}) => (
  <Text
    style={{
      color: "#000",
      marginHorizontal: 5,
      fontSize: 16,
    }}
    { ...props}
  >Next</Text>
)

const Done = ({...props}) => (
  <Text
    style={{
      color: "#000",
      marginHorizontal: 7,
      fontSize: 18,
    }}
    { ...props}
  >DONE</Text>
)


const OnboardingScreen = ({navigation}) => {
	return (
			<Onboarding
				SkipButtonComponent = {Skip}
				NextButtonComponent = {Next}
				DoneButtonComponent = {Done}
				DotComponent = {Dot}
				onSkip={() => navigation.replace("Login")}
				onDone={() => navigation.navigate("Login")}
				pages={[
					{
						backgroundColor: '#a6e4d0',
						image: <Image source={require('../assets/onboarding-img1.png')} />,
						title: 'Onboarding',
						subtitle: 'Done with React Native Onboarding Swiper',
					},
					{
						backgroundColor: '#fdeb93',
						image: <Image source={require('../assets/onboarding-img2.png')} />,
						title: 'Onboarding',
						subtitle: 'Done with React Native Onboarding Swiper',
					},
					{
						backgroundColor: '#e9bcbe',
						image: <Image source={require('../assets/onboarding-img3.png')} />,
						title: 'Onboarding',
						subtitle: 'Done with React Native Onboarding Swiper',
					},
  			]}
			/>
	)
}


export default OnboardingScreen;