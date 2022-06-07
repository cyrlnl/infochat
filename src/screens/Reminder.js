import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function Reminder() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      blurRadius={modalVisible ? 4 : 0}
      style={{
        zIndex: 99
      }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10, color: '#2c8162', textAlign: 'center', fontSize: 22, fontFamily: 'Poppins-Regular' }}>How it Works?</Text>

            <Text>
              <Text style={{ color: '#2c8162', fontSize: 18, fontFamily: 'Poppins-Regular' }}>
                For Gordon College Student:{'\n'}
              </Text>
              <Text style={{ color: '#333', fontFamily: 'Poppins-Medium' }}>
                {'\n'}
                To log in, use your Gordon College Domain E-mail <Text style={{ color: '#2c8162' }}>(201******@gordoncollege.edu.ph)</Text> and default password <Text style={{ color: '#2c8162' }}>(lastnameGC2022)</Text>.
                {'\n'}
              </Text>

              <Text style={{ color: '#2c8162', fontSize: 18, fontFamily: 'Poppins-Regular' }}>
                {'\n'}For Guest and New Users Outside Gordon College Community:{'\n'}
              </Text>
              <Text style={{ color: '#333', fontFamily: 'Poppins-Medium' }}>
                {'\n'}
                You can register an account through our <Text>Registration Form</Text>.
                {'\n'}
                {'\n'}
                OR
                {'\n'}
                {'\n'}
                If you wish to <Text style={{ color: '#2c8162' }}>SIGN IN WITH GOOGLE</Text>, kindly <Text style={{ color: '#2c8162' }}>SIGN UP WITH GOOGLE first</Text>, found on the <Text style={{ color: '#2c8162' }}>Registration Page</Text> to save your Google Account data. {'\n'}Once logged out, you can now <Text style={{ color: '#2c8162' }}>SIGN IN WITH GOOGLE</Text> every time you open the application.
              </Text>
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Confirm</Text>
              <Icon name="checkcircleo" color="#fff" size={18} style={{ paddingBottom: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: -100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: windowHeight - 150,
    width: windowWidth - 60,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#999',
    margin: 5,
    padding: 10,
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
    // marginTop: 50,
    width: 130,
    padding: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 10,
    borderRadius: 20,
    elevation: 2,
    flexDirection: 'row',
  },
  buttonClose: {
    backgroundColor: "#1E8C45",
  },
  textStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: 'Poppins-Medium',
    textAlign: "center"
  },
  modalText: {
    // marginBottom: 10,
    color: '#333',
    fontFamily: 'Poppins-Medium',
    textAlign: 'left'
  }
});