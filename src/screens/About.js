import React from 'react'
import { View, StyleSheet, Image, ScrollView, Text, Linking } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const About = () => {

	return (
		<ScrollView style={styles.container}>
			<View style={styles.userInfoSection}>
				<View style={{ flexDirection: 'row', marginTop: 15 }}>
					<Image
						source={require('../assets/gc-logos/gclogo.png')}
						style={{
							height: 120,
							width: 120,
						}}
					/>
					<View style={{ marginLeft: 12 }}>
						<Text style={[styles.title, {
							marginTop: -1,
							marginBottom: 5,
							color: '#009e05'
						}]}>
							Gordon College
						</Text>
						<Text style={[styles.caption, { color: 'black' }]}>
							Since February 24, 1999
						</Text>
						<Text style={styles.caption}>
							{'\n'}Gordon College (formerly Olongapo{'\n'}City Colleges) is a local college{'\n'}operating under the City Government{'\n'}of Olongapo.
						</Text>
					</View>
				</View>
			</View>

			<View style={[styles.userInfoSection, {
				marginBottom: 5,
				marginTop: -10
			}]}>
				<View style={styles.row}>
					<Image
						source={require('../assets/gc-logos/css.png')}
						style={{
							height: 90,
							width: 90,
							marginHorizontal: 20,
							right: 10
						}}
					/>
					<Image
						source={require('../assets/gc-logos/cba.png')}
						style={{
							height: 90,
							width: 90,
							marginHorizontal: 10,
							right: 10
						}}
					/>
					<Image
						source={require('../assets/gc-logos/ceas.png')}
						style={{
							height: 90,
							width: 90,
							marginHorizontal: 10
						}}
					/>
				</View>
			</View>

			<View style={[styles.userInfoSection, {
				marginBottom: 5,
				marginTop: -10
			}]}>
				<View style={styles.row}>
					<Image
						source={require('../assets/gc-logos/cahs.png')}
						style={{
							height: 90,
							width: 90,
							marginHorizontal: 20,
							right: 10
						}}
					/>
					<Image
						source={require('../assets/gc-logos/chtm.png')}
						style={{
							height: 90,
							width: 90,
							marginHorizontal: 10,
							right: 10
						}}
					/>
					<Image
						source={require('../assets/gc-logos/shs.png')}
						style={{
							height: 90,
							width: 90,
							marginHorizontal: 10
						}}
					/>
				</View>
			</View>

			<View style={{
				paddingHorizontal: 20,
				marginBottom: -20,
			}}>
				<View style={{
					flexDirection: 'row',
					marginBottom: -10,
				}}>

					<Text style={[styles.text1, { paddingHorizontal: 100, right: 100 }]}>
						<Text style={{ color: '#235b93', fontSize: 20 }}>{'\n'}VISION</Text>
						{'\n'}
						A premiere institution of higher learning committed to the holistic development of the human person and society.{'\n'}
						{'\n'}

					</Text>
					<Text style={[styles.text1, { paddingHorizontal: 90, right: 255 }]}>
						<Text style={{ color: '#ff3842', fontSize: 20 }}>{'\n'}MISSION</Text>
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

					<Text style={styles.text1}>
						<Text style={{ color: '#009e05', fontSize: 20 }}>{'\n'}GOALS</Text>
						{'\n'}
						Gordon College shall:{'\n'}
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
								height: 120,
								width: 120,
								borderRadius: 100,
								borderWidth: 1,
								borderColor: '#235b93'
							}}
						/>
						<View style={{ marginLeft: 12 }}>
							<Text style={[styles.title, {
								marginTop: 1,
								marginBottom: 5,
								color: '#fff'
							}]}>
								GC InfoChat
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb' }]}>
								Developed by Team Codebrewers
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb' }]}>
								{'\n'}
								Gordon College Informational Chatbot{'\n'}Description
							</Text>
						</View>
					</View>
				</View>

				<View style={{
					paddingHorizontal: 20,
					marginTop: -20,
				}}>
					<View style={{ flexDirection: 'row' }}>
						<Image
							source={require('../assets/codebrewers.png')}
							style={{
								width: 120,
								height: 120,
								resizeMode: 'contain'
							}}
						/>
						<View style={{ marginLeft: 12 }}>
							<Text style={[styles.title, {
								marginTop: -10,
								marginBottom: 5,
								color: '#603813'
							}]}>
								Codebrewers
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb' }]}>
								Developers of GC InfoChat
							</Text>
							<Text style={[styles.caption, { color: '#dbdbdb' }]}>
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
						<Text style={{ color: "#fff", marginLeft: 5, fontSize: 12 }}>
							info@gordoncollege.edu.ph
						</Text>

						<Icon name="email" color="#3dc2ff" size={17} style={{ marginLeft: 10 }} />
						<Text style={{ color: "#fff", marginLeft: 5, fontSize: 12 }}>
							codebrewers.ccs@gmail.com
						</Text>
					</View>
					<View style={styles.row}>
						<Icon name="web" color="#2dd36f" size={17} style={{ marginLeft: -10 }} />
						<Text
							style={{ color: "#fff", marginLeft: 5, fontSize: 12 }}
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
	},
	header: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 50
	},
	footer: {
		flex: 3,
		backgroundColor: '#5cacd4',
    // borderColor: '#235b93',
    // borderWidth: 4,
    // borderBottomColor: '#f2f2f2',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		// paddingHorizontal: 20,
		// paddingVertical: 30
	},
	userInfoSection: {
		paddingHorizontal: 20,
		marginBottom: 25,
	},
	title: {
		fontSize: 24,
		fontStyle: 'italic',
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
		fontWeight: '500',
		fontStyle: 'italic',
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
		// textAlign: 'center',
		// marginTop: -40,
		fontSize: 14,
		lineHeight: 16,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: '#6b6b6b',
	},
});
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	header: {
// 		height: 200,
// 	},
// 	avatar: {
// 		width: 140,
// 		height: 140,
// 		borderRadius: 100,
// 		borderWidth: 1,
// 		borderColor: "black",
// 		// marginBottom: -5,
// 		alignSelf: 'center',
// 		position: 'absolute',
// 		marginTop: 10
// 	},
// 	text1: {
// 		textAlign: 'center',
// 		marginTop: -40,
// 		fontSize: 16,
// 		// lineHeight: 21,
// 		fontWeight: 'bold',
// 		letterSpacing: 0.25,
// 		color: 'white',
// 	},
// 	bg: {
// 		opacity: 1.5
// 	}
// });





export default About