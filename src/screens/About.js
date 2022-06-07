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
								height: 100,
								width: 100,
								left: 30
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
						<Text style={{ color: '#2c8162', fontSize: 20, fontFamily: 'Poppins-Bold', textAlign: 'center' }}>{'\n'}VISION</Text>
						{'\n'}
						A premiere institution of higher learning committed to the holistic development of the human person and society.{'\n'}
						{'\n'}

					</Text>
				</View>

				<View style={{ marginBottom: -10 }}>
					<Text style={styles.text1}>
						<Text style={{ color: '#2c8162', fontSize: 20, fontFamily: 'Poppins-Bold', textAlign: 'center' }}>{'\n'}MISSION</Text>
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
						color: '#2c8162',
						fontSize: 20
					}}>
						GOALS
					</Text>
					<Text style={{
						textAlign: 'center',
						fontFamily: 'Poppins-Regular',
						color: '#2c8162',
						fontSize: 15
					}}>
						Gordon College shall:
					</Text>
					<Text style={{
						fontSize: 14,
						fontFamily: 'Poppins-Regular',
						color: '#000',
					}}>
						1.) Provide opportunities that will enable individuals to acquire a high level of professional, technical and vocational courses of studies.{'\n'}
						2.) Develop innovative programs, projects and models of practice by undertaking research and studies.{'\n'}
						3.) Promote community development through relevant extension programs.{'\n'}
						4.) Provide opportunities for entrepreneurship and employability of graduates.
					</Text>
				</View>
			</View>

			<View style={styles.footer}>
				<View style={{
					paddingHorizontal: 20,
					marginBottom: 30,
				}}>
					<View>

						<Text style={{
							textAlign: 'center',
							fontFamily: 'Poppins-Medium',
							top: 10,
							color: '#fff',
							fontSize: 20
						}}>
							Gordon College’s E-mail Directory
						</Text>
						<Text style={{
							textAlign: 'center',
							fontFamily: 'Poppins-Regular',
							color: '#fff',
							fontSize: 15
						}}>
							{'\n'}
							Offices/Departments
						</Text>
						<Text style={styles.text2}>
							{'\n'}	<Text style={{ fontSize: 15 }}>• Office of the College President:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:info@gordoncollege.edu.ph?subject=Concern&body=Description')}>info@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• Registrar's Office:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:registrar@gordoncollege.edu.ph?subject=Concern&body=Description')}>registrar@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• For Document Requests:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:gctranscripts@gordoncollege.edu.ph?subject=Concern&body=Description')}>gctranscripts@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• Finance Unit:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:gcpay@gordoncollege.edu.ph?subject=Concern&body=Description')}>gcpay@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• Institute of Graduate Studies:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:anicas.roel@gordoncollege.edu.ph?subject=Concern&body=Description')}>anicas.roel@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• Senior High School Department:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:info.shs@gordoncollege.edu.ph?subject=Concern&body=Description')}>info.shs@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• College of Allied Health Studies:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:dean.cahs@gordoncollege.edu.ph?subject=Concern&body=Description')}>dean.cahs@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• College of Business and Accountancy:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:dean.cba@gordoncollege.edu.ph?subject=Concern&body=Description')}>dean.cba@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• College of Computer Studies:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:dean.ccs@gordoncollege.edu.ph?subject=Concern&body=Description')}>dean.ccs@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• College of Education, Arts, and Sciences:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:dean.ceas@gordoncollege.edu.ph?subject=Concern&body=Description')}>dean.ceas@gordoncollege.edu.ph</Text>{'\n'}{'\n'}
							<Text style={{ fontSize: 15 }}>• College of Hospitality and Tourism Mgmt.:</Text>{'\n'}&nbsp;&nbsp;&nbsp;<Text style={{ textDecorationLine: 'underline', color: '#222' }} onPress={() => Linking.openURL('mailto:dean.chtm@gordoncollege.edu.ph?subject=Concern&body=Description')}>dean.chtm@gordoncollege.edu.ph</Text>
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.userInfoSection}>
				<View>
					<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 24, textAlign: 'center', color: '#2c8162', marginTop: 20 }}>
						GC InfoChat
					</Text>
					<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, textAlign: 'center', color: '#000' }}>
						Gordon College Informational Chatbot is an automated chatbot that provide answers for students and guests' queries or questions about the institution.
					</Text>
				</View>

				<View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, justifyContent: 'space-around', alignItems: 'center' }}>
					<Image
						source={require('../assets/app_logo/1.png')}
						style={{
							height: 95,
							width: 95,
							resizeMode: 'contain',
							marginTop: 10
						}}
					/>
					<Image
						source={require('../assets/codebrewers.png')}
						style={{
							width: 140,
							height: 95,
							resizeMode: 'contain',
							marginTop: 10
						}}
					/>
				</View>
			</View>


			<View style={{
				paddingHorizontal: 20,
				marginTop: 10,
				marginBottom: 25,
			}}>
				<Text style={{fontFamily: 'Poppins-Regular', fontSize: 14, textAlign: 'center', marginBottom: 8, color: '#000' }}>
					Feel free to contact us:
				</Text>
				<View style={styles.row1}>
					<Icon name="email" color="#1f75cc" size={20} style={{ marginLeft: 10 }} />
					<Text
						style={{ color: "#000", textDecorationLine: 'underline', marginLeft: 5, fontSize: 14, fontFamily: 'Poppins-Light' }}
						onPress={() => Linking.openURL('mailto:codebrewers.ccs@gmail.com?subject=Concern&body=Description')}
					>
						codebrewers.ccs@gmail.com
					</Text>
				</View>

				<View style={styles.row1}>
					<Icon name="web" color="#049315" size={20} style={{ marginLeft: -10 }} />
					<Text
						style={{ color: "#000", marginLeft: 5, fontSize: 14, fontFamily: 'Poppins-Light' }}
						onPress={() => Linking.openURL('https://l.facebook.com/l.php?u=http%3A%2F%2Fwww.gordoncollege.edu.ph%2F%3Ffbclid%3DIwAR2zV2HO1jAjAEFJFlRIsmeQnLpZoBLGZ-uYgioeogLRhckxa2JSn5UB9yw&h=AT1GekK_M-CHU1soVTdLNCYFT_LUcDi1BWGnk0TbuMauRtfZqjkt0UrftW3JO1QISzAoktTSeu83RjRx00XNdKWMC0JoNcyAdlVUtVuoiSJH0Pw75Vkwia63U03R1haXhiRH5w')}
					>
						http://www.gordoncollege.edu.ph/
					</Text>
				</View>
			</View>

			<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -5 }}>
				<Text style={{ fontSize: 10, color: '#000', fontFamily: 'Poppins-light' }}>Version 1.4</Text>
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
		backgroundColor: '#38a67e',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginHorizontal: 10,
		marginTop: 9
	},
	footer: {
		flex: 3,
		backgroundColor: '#38a67e',
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
		fontSize: 14,
		color: '#fff',
		paddingLeft: 50,
		paddingRight: 30,
		fontFamily: 'Poppins-Regular'
	},
	caption1: {
		fontSize: 14,
		color: '#000',
		marginLeft: 20,
		marginRight: 50,
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
		color: '#000',
	},
	text2: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		color: '#fff',
	},
});


export default About