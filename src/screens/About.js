import React from 'react'
import { ImageBackground, View, StyleSheet, Image, ScrollView, Text, Linking } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const About = () => {

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.userInfoSection}>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Image
							source={require('../assets/gc-logos/gclogo.png')}
							style={{
								height: 90,
								width: 90,
								left: 40
							}}
						/>
						<View>
							<Text style={[styles.title, {
								marginTop: 5,
								color: '#f2f2f2'
							}]}>
								Gordon College
							</Text>
							<Text style={styles.caption}>
								Since February 24, 1999 Gordon College (formerly Olongapo City Colleges) is a local college operating under the City Government of Olongapo.
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.userInfoSection}>
					<View style={styles.row}>
						<Image
							source={require('../assets/gc-logos/css.png')}
							style={{
								height: 80,
								width: 80,
							}}
						/>
						<Image
							source={require('../assets/gc-logos/cba.png')}
							style={{
								height: 80,
								width: 80,
							}}
						/>
						<Image
							source={require('../assets/gc-logos/ceas.png')}
							style={{
								height: 80,
								width: 80,
							}}
						/>
					</View>
				</View>

				<View style={styles.userInfoSection}>
					<View style={styles.row}>
						<Image
							source={require('../assets/gc-logos/cahs.png')}
							style={{
								height: 80,
								width: 80,
							}}
						/>
						<Image
							source={require('../assets/gc-logos/chtm.png')}
							style={{
								height: 80,
								width: 80,
							}}
						/>
						<Image
							source={require('../assets/gc-logos/shs.png')}
							style={{
								height: 80,
								width: 80,
							}}
						/>
					</View>
				</View>
			</View>

			<View style={{
				paddingHorizontal: 20,
			}}>
				<View style={{ marginBottom: -30 }}>
					<Text style={styles.text1}>
						<Text style={{ color: '#235b93', fontSize: 20, fontFamily: 'Poppins-Bold', textAlign: 'center' }}>{'\n'}VISION</Text>
						{'\n'}
						A premiere institution of higher learning committed to the holistic development of the human person and society.{'\n'}
						{'\n'}

					</Text>
				</View>

				<View style={{ marginBottom: -10 }}>
					<Text style={styles.text1}>
						<Text style={{ color: '#235b93', fontSize: 20, fontFamily: 'Poppins-Bold', textAlign: 'center' }}>{'\n'}MISSION</Text>
						{'\n'}
						To produce well-trained, skilled, dynamic, and competitive individuals imbued with values and attitudes and responsive to the changing needs of the local, national and global communities.{'\n'}
						{'\n'}
					</Text>
				</View>
			</View>

			<View style={{
				paddingHorizontal: 20,
				marginBottom: 30,
			}}>
				<View>

					<Text style={{
						textAlign: 'center',
						fontFamily: 'Poppins-Bold',
						top: 10,
						color: '#235b93',
						fontSize: 20
					}}>
						GOALS
					</Text>
					<Text style={{
						textAlign: 'center',
						fontFamily: 'Poppins-Regular',
						color: '#235b93',
						fontSize: 15
					}}>
						Gordon College shall:
					</Text>
					<Text style={styles.text2}>
						1.) Provide opportunities that will enable individuals to acquire a high level of professional, technical and vocational courses of studies.{'\n'}
						2.) Develop innovative programs, projects and models of practice by undertaking research and studies.{'\n'}
						3.) Promote community development through relevant extension programs.{'\n'}
						4.) Provide opportunities for entrepreneurship and employability of graduates.
					</Text>
				</View>
			</View>

			<View style={styles.footer}>
				<View style={styles.userInfoSection}>
					<View style={{ flexDirection: 'row', marginTop: 10 }}>
						<Image
							source={require('../assets/logo.png')}
							style={{
								height: 95,
								width: 95,
								borderRadius: 100,
								borderWidth: 1,
								borderColor: '#333',
								marginTop: 10
							}}
						/>
						<View>
							<Text style={[styles.title1, {
								marginTop: 5,
								color: '#235b93',
							}]}>
								GC InfoChat
							</Text>
							<Text style={styles.caption1}>
								GC InfoChat (Gordon College Informational Chatbot) is an{'\n'}automated chatbot that provide answers for students and guests' queries or questions about the institution.
							</Text>
						</View>
					</View>
				</View>

				<View style={{
					marginTop: 5,
				}}>
					<View style={{ flexDirection: 'row', paddingHorizontal: 20, }}>
						<Image
							source={require('../assets/codebrewers.png')}
							style={{
								width: 95,
								height: 95,
								resizeMode: 'contain'
							}}
						/>
						<View>
							<Text style={[styles.title1, {
								marginBottom: 5,
								color: '#502b09'
							}]}>
								Codebrewers
							</Text>
							<Text style={[styles.caption1, { color: '#000', marginTop: -10 }]}>
								Developers of GC InfoChat
							</Text>
							<Text style={[styles.caption1, { color: '#000', marginTop: -20, }]}>
								{'\n'}
								Dianne F. Sudario
								{'\n'}
								Cyrel Neil E. Absalon
								{'\n'}
								Ria Christina G. Yambao
							</Text>
						</View>
					</View>
				</View>


				<View style={{
					paddingHorizontal: 20,
					marginTop: 10,
					marginBottom: 25,
				}}>
					<View style={styles.row1}>
						<Icon name="email" color="#049315" size={17} style={{ marginLeft: -5 }} />
						<Text style={{ color: "#333", marginLeft: 5, fontSize: 10.5, fontFamily: 'Poppins-Light' }}>
							info@gordoncollege.edu.ph
						</Text>

						<Icon name="email" color="#1f75cc" size={17} style={{ marginLeft: 10 }} />
						<Text style={{ color: "#333", marginLeft: 5, fontSize: 10.5, fontFamily: 'Poppins-Light' }}>
							codebrewers.ccs@gmail.com
						</Text>
					</View>
					<View style={styles.row1}>
						<Icon name="web" color="#049315" size={17} style={{ marginLeft: -10 }} />
						<Text
							style={{ color: "#333", marginLeft: 5, fontSize: 10.5, fontFamily: 'Poppins-Light' }}
							onPress={() => Linking.openURL('https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.gordoncollege.edu.ph%2F%3Ffbclid%3DIwAR2zV2HO1jAjAEFJFlRIsmeQnLpZoBLGZ-uYgioeogLRhckxa2JSn5UB9yw&h=AT1GekK_M-CHU1soVTdLNCYFT_LUcDi1BWGnk0TbuMauRtfZqjkt0UrftW3JO1QISzAoktTSeu83RjRx00XNdKWMC0JoNcyAdlVUtVuoiSJH0Pw75Vkwia63U03R1haXhiRH5w')}
						>
							http://www.gordoncollege.edu.ph/
						</Text>
					</View>
				</View>

				<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
					<Text style={{ fontSize: 13, color: '#333', fontFamily: 'Poppins-Medium' }}>Version 1.0</Text>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flex: 1,
		backgroundColor: '#235b93',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginHorizontal: 10,
		marginTop: 9
	},
	footer: {
		flex: 3,
		backgroundColor: '#b0bec5',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginHorizontal: 10,
		marginBottom: 10
	},
	userInfoSection: {
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		paddingLeft: 50,
		fontFamily: 'Poppins-Regular'
	},
	title1: {
		fontSize: 24,
		paddingLeft: 20,
		fontFamily: 'Poppins-Regular'
	},
	caption: {
		fontSize: 13,
		color: '#fff',
		paddingLeft: 50,
		paddingRight: 30,
		fontFamily: 'Poppins-Regular'
	},
	caption1: {
		fontSize: 13,
		color: '#000',
		paddingLeft: 20,
		paddingRight: 50,
		fontFamily: 'Poppins-Regular'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	row1: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	infoBoxWrapper: {
		borderBottomColor: '#dddddd',
		borderBottomWidth: 1,
		borderTopColor: '#dddddd',
		borderTopWidth: 1,
		flexDirection: 'row',
		height: 100,
	},
	infoBox: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	menuWrapper: {
		marginTop: 10,
	},
	menuItem: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 30,
	},
	menuItemText: {
		color: '#777777',
		marginLeft: 20,
		fontWeight: '600',
		fontSize: 16,
	},
	text1: {
		textAlign: 'center',
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#444',
	},
	text2: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#444',
	},
});


export default About