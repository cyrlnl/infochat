import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function SubmitQueryModal() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      blurRadius={modalVisible ? 4 : 0}
      style={{
        flex: 1,
        zIndex: 99,
      }}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>

              <Text style={{ marginBottom: 10, color: '#2c8162', textAlign: 'center', fontSize: 21, fontFamily: 'Poppins-Regular' }}>
                How to Access the Application?
              </Text>

              <Image
                style={styles.tinyLogo}
                // source={require('../assets/modal/login.png')}
                source={require('../assets/modal/login.png')}
              />

              <Text>
                <Text style={{ color: '#2c8162', fontSize: 16, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                  For Gordon College Student:{'\n'}
                </Text>
                <Text style={{ color: '#333', fontFamily: 'Poppins-Medium', }}>
                  {'\n'}
                  To login, use your Gordon College Domain E-mail <Text style={{ color: '#2c8162' }}>(201******@gordoncollege.edu.ph)</Text> and default password <Text style={{ color: '#2c8162' }}>(lastnameGC2022)</Text>.
                  {'\n'}
                </Text>

                <Text style={{ color: '#2c8162', fontSize: 16, fontFamily: 'Poppins-Medium' }}>
                  {'\n'}For Guest and New Users Outside Gordon College Community:{'\n'}
                </Text>
                <Text style={{ color: '#333', fontFamily: 'Poppins-Medium' }}>
                  {'\n'}
                  <Text>You have 2 options to access the application:</Text>
                  {'\n'}
                  {'\n'}
                  1. You can register an account through the <Text style={{ color: '#2c8162' }}>Registration Form</Text>. Please, use your <Text style={{ color: '#2c8162' }}>valid e-mail address</Text>so you can get verified.
                  {'\n'}
                  {'\n'}
                  2. You can use <Text style={{ color: '#2c8162' }}>Google Sign In</Text> to directly access the application without verifying yourself.
                  {'\n'}
                  {'\n'}
                  <Text style={{ color: '#2c8162' }}>NOTE: </Text>Questions will be asked must be about Gordon College only.
                  {'\n'}
                  {'\n'}
                  <Text style={{ color: '#2c8162' }}>Have a nice day!</Text>
                </Text>
              </Text>

              <Button
                title="OKAY"
                iconContainerStyle={{ left: -10 }}
                iconRight
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, color: '#fff', }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 20,
                }}
                containerStyle={{
                  width: 100,
                  marginVertical: 30,
                  marginBottom: 10
                }}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <FAB
        icon={{
          name: 'info',
          type: 'font-awesome',
          size: 22,
          color: '#2c8162',
        }}
        buttonStyle={{
          backgroundColor: 'white',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
          width: 40,
          height: 40,
        }}
        containerStyle={{
          opacity: 0.9,
          width: 40,
          height: 40,
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onPress={() => setModalVisible(true)}
      />

    </View>
  );

}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20
  },
  modalView: {
    // height: windowHeight - 150,
    width: windowWidth - 60,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
    margin: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: 'absolute',
    top: -5,
    left: 220
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333'
  },
  tinyLogo: {
    width: 160,
    height: 160,
    marginBottom: 20
  }
});