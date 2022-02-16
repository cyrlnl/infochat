import React from 'react'
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";

const About = () => {

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Image
					style={styles.bg}
					source={require('../assets/gc-logos/gcwallpaper.jpg')}
				/>
			</View>
			<Image style={styles.avatar} source={require('../assets/gc-logos/gclogo.png')} />

			<Text style={styles.text1}>
				ABOUT:{'\n'}
				Gordon College (formerly Olongapo City Colleges) is a local college operating under the City Government of Olongapo.{'\n'}
				{'\n'}
				VISION: {'\n'}
				A premiere institution of higher learning committed to the holistic development of the human person and society.{'\n'}
				{'\n'}
				MISSION:{'\n'}
				To produce well-trained, skilled, dynamic, and competitive individuals imbued with values and attitudes and responsive to the changing needs of the local, national and global communities.{'\n'}
				{'\n'}
				GOALS:
				Gordon College shall:{'\n'}
				• provide opportunities that will enable individuals to acquire a high level of professional, technical and vocational courses of studies{'\n'}
				• develop innovative programs, projects and models of practice by undertaking research and studies{'\n'}
				• promote community development through relevant extension programs{'\n'}
				• provide opportunities for entrepreneurship and employability of graduates.
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 200,
	},
	avatar: {
		width: 140,
		height: 140,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "black",
		// marginBottom: -5,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 10
	},
	text1: {
		textAlign: 'center',
		marginTop: -40,
		fontSize: 16,
		// lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	bg: {
		opacity: 1.5
	}
});





export default About