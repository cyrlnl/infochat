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
								top: 10,
								left: 5
							}}
						/>
						<View style={{ marginLeft: 12 }}>
							<Text style={[styles.title, {
								marginTop: 5,
								// marginBottom: -5,
								color: '#f2f2f2'
							}]}>
								Gordon College
							</Text>
							<Text style={[styles.caption, { color: '#f2f2f2', marginTop: -2 }]}>
								Since February 24, 1999
							</Text>
							<Text style={[styles.caption, { color: '#f2f2f2', marginTop: -15 }]}>
								{'\n'}Gordon College (formerly Olongapo{'\n'}City Colleges) is a local college{'\n'}operating under the City Government{'\n'}of Olongapo.
							</Text>
						</View>
					</View>
				</View>

				<View style={[styles.userInfoSection, {
					marginBottom: 5,
					marginTop: -5
				}]}>
					<View style={styles.row}>
						<Image
							source={require('../assets/gc-logos/css.png')}
							style={{
								height: 80,
								width: 80,
								marginHorizontal: 20,
								right: 5
							}}
						/>
						<Image
							source={require('../assets/gc-logos/cba.png')}
							style={{
								height: 80,
								width: 80,
								marginHorizontal: 10,
								right: 5
							}}
						/>
						<Image
							source={require('../assets/gc-logos/ceas.png')}
							style={{
								height: 80,
								width: 80,
								marginHorizontal: 10
							}}
						/>
					</View>
				</View>

				<View style={[styles.userInfoSection, {
					marginBottom: 5,
					marginTop: -5
				}]}>
					<View style={styles.row}>
						<Image
							source={require('../assets/gc-logos/cahs.png')}
							style={{
								height: 80,
								width: 80,
								marginHorizontal: 20,
								right: 5
							}}
						/>
						<Image
							source={require('../assets/gc-logos/chtm.png')}
							style={{
								height: 80,
								width: 80,
								marginHorizontal: 10,
								right: 5
							}}
						/>
						<Image
							source={require('../assets/gc-logos/shs.png')}
							style={{
								height: 80,
								width: 80,
								marginHorizontal: 10
							}}
						/>
					</View>
				</View>
			</View>

			<View style={{
				paddingHorizontal: 20,
				marginBottom: -30,
			}}>
				<View style={{
					flexDirection: 'row',
					marginBottom: -30,
				}}>

					<Text style={styles.text1}>
						<Text style={{ color: '#235b93', fontSize: 20 }}>{'\n'}VISION</Text>
						{'\n'}
						A premiere institution of higher learning committed to the holistic development of the human person and society.{'\n'}
						{'\n'}

					</Text>
				</View>
				<View style={{
					flexDirection: 'row',
					marginBottom: 10,
				}}>
					<Text style={styles.text1}>
						<Text style={{ color: '#235b93', fontSize: 20 }}>{'\n'}MISSION</Text>
						{'\n'}
						To produce well-trained, skilled, dynamic, and competitive individuals imbued with values and attitudes and responsive to the changing needs of the local, national and global communities.{'\n'}
						{'\n'}
					</Text>
				</View>
			</View>

			<View style={{
				paddingHorizontal: 20,
				marginBottom: 1,
			}}>
				<View style={{ marginBottom: 10 }}>

					<Text style={{
						textAlign: 'center',
						// lineHeight: 16,
						fontFamily: 'Poppins-Regular',
						top: 10,
						letterSpacing: 0.25,
						color: '#235b93',
						fontSize: 20
					}}>
						GOALS
					</Text>
					<Text style={{
						textAlign: 'center',
						// lineHeight: 16,
						fontFamily: 'Poppins-Regular',
						// letterSpacing: 0.25, 
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
								height: 90,
								width: 90,
								borderRadius: 100,
								borderWidth: 1,
								borderColor: '#333',
							}}
						/>
						<View style={{ marginLeft: 12 }}>
							<Text style={[styles.title, {
								marginTop: 1,
								marginBottom: 5,
								color: '#fff',
								// backgroundColor: 'red'
							}]}>
								GC InfoChat
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb', marginTop: -5 }]}>
								Developed by Team Codebrewers
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb', marginTop: -15 }]}>
								{'\n'}
								Gordon College Informational{'\n'}Chatbot Description
							</Text>
						</View>
					</View>
				</View>

				<View style={{
					paddingHorizontal: 20,
					marginTop: 5,
				}}>
					<View style={{ flexDirection: 'row' }}>
						<Image
							source={require('../assets/codebrewers.png')}
							style={{
								width: 90,
								height: 90,
								resizeMode: 'contain'
							}}
						/>
						<View style={{ marginLeft: 12 }}>
							<Text style={[styles.title, {
								marginTop: -10,
								marginBottom: 5,
								color: '#f2f2f2'
							}]}>
								Codebrewers
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb', marginTop: -5 }]}>
								Developers of GC InfoChat
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb', marginTop: -15, }]}>
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
					<View style={styles.row}>
						<Icon name="email" color="#2dd36f" size={17} style={{ marginLeft: -10 }} />
						<Text style={{ color: "#fff", marginLeft: 5, fontSize: 10.5, fontFamily: 'Poppins-Light' }}>
							info@gordoncollege.edu.ph
						</Text>

						<Icon name="email" color="#3dc2ff" size={17} style={{ marginLeft: 10 }} />
						<Text style={{ color: "#fff", marginLeft: 5, fontSize: 10.5, fontFamily: 'Poppins-Light' }}>
							codebrewers.ccs@gmail.com
						</Text>
					</View>
					<View style={styles.row}>
						<Icon name="web" color="#2dd36f" size={17} style={{ marginLeft: -10 }} />
						<Text
							style={{ color: "#fff", marginLeft: 5, fontSize: 10.5, fontFamily: 'Poppins-Light' }}
							onPress={() => Linking.openURL('https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.gordoncollege.edu.ph%2F%3Ffbclid%3DIwAR2zV2HO1jAjAEFJFlRIsmeQnLpZoBLGZ-uYgioeogLRhckxa2JSn5UB9yw&h=AT1GekK_M-CHU1soVTdLNCYFT_LUcDi1BWGnk0TbuMauRtfZqjkt0UrftW3JO1QISzAoktTSeu83RjRx00XNdKWMC0JoNcyAdlVUtVuoiSJH0Pw75Vkwia63U03R1haXhiRH5w')}
						>
							http://www.gordoncollege.edu.ph/
						</Text>
					</View>
				</View>

				<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
					<Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', fontStyle: 'italic' }}>Version 1.0</Text>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: '#235b93',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginHorizontal: 10,
		marginTop: 9
		// paddingHorizontal: 20,
		// paddingBottom: 50
	},
	footer: {
		flex: 3,
		backgroundColor: '#235b93',
		// borderColor: '#235b93',
		// borderWidth: 4,
		// borderBottomColor: '#f2f2f2',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginHorizontal: 10,
		marginBottom: 10
	},
	userInfoSection: {
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	title: {
		fontSize: 24,
		fontFamily: 'Poppins-Regular'
	},
	caption: {
		fontSize: 14,
		lineHeight: 15,
		fontFamily: 'Poppins-Regular'
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10,
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
		lineHeight: 26,
	},
	text1: {
		textAlign: 'center',
		// marginTop: -40,
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'Poppins-Regular',
		letterSpacing: 0.25,
		color: '#444',
	},
	text2: {
		// textAlign: 'center',
		// marginTop: -40,
		fontSize: 14,
		lineHeight: 16,
		fontFamily: 'Poppins-Regular',
		letterSpacing: 0.25,
		color: '#444',
	},
});


export default About