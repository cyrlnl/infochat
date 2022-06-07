import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function ChatbotInstruction() {

  const [modalVisible, setModalVisible] = useState(false);

  checkIfNeedOpenModal = async () => {
    try {
      const isFirstOpen = await AsyncStorage.getItem('IS_FIRST_OPEN');
      if (!isFirstOpen || isFirstOpen !== 'true') { // Check if key IS_FIRST_OPEN doesnt have value or not 'true'
        // isFirstOpen is null or not 'true' so this is first time app open

        setModalVisible(true)
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  saveModalOpen = async () => {
    try {
      await AsyncStorage.setItem('IS_FIRST_OPEN', 'true');
    } catch (error) {
      // Error saving data
    }
  }

  onModalShow = () => {
    saveModalOpen();
  }

  useEffect(() => {
    checkIfNeedOpenModal()
  }, [])

  return (
    <View
      blurRadius={modalVisible ? 4 : 0}
      style={{ zIndex: 99 }}>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onShow={onModalShow}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10, color: '#235b93', textAlign: 'center', fontSize: 22, fontFamily: 'Poppins-Regular' }}>How it Works?</Text>

            <Text>
              <Text style={{ color: '#235b93', fontSize: 18, fontFamily: 'Poppins-Regular' }}>
                For Gordon College Student:{'\n'}
              </Text>
              <Text style={{ color: '#333', fontFamily: 'Poppins-Medium' }}>
                {'\n'}
                To log in, use your Gordon College Domain E-mail <Text style={{ color: '#235b93' }}>(201******@gordoncollege.edu.ph)</Text> and default password <Text style={{ color: '#235b93' }}>(lastnameGC2022)</Text>.
                {'\n'}
              </Text>

              <Text style={{ color: '#235b93', fontSize: 18, fontFamily: 'Poppins-Regular' }}>
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
                If you wish to <Text style={{ color: '#235b93' }}>SIGN IN WITH GOOGLE</Text>, kindly <Text style={{ color: '#235b93' }}>SIGN UP WITH GOOGLE first</Text>, found on the <Text style={{ color: '#235b93' }}>Registration Page</Text> to save your Google Account data. {'\n'}Once logged out, you can now <Text style={{ color: '#235b93' }}>SIGN IN WITH GOOGLE</Text> every time you open the application.
              </Text>
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
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
          size: 18,
          color: '#2c8162',
        }}
        buttonStyle={{
          backgroundColor: 'white',
          borderColor: 'transparent',
          borderRadius: 30,
          top: 1,
          width: 30,
          height: 35,
        }}
        containerStyle={{
          opacity: 0.9,
          width: 32,
          height: 31,
          position: 'absolute',
          top: 5,
          left: 5,
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
    height: windowHeight - 100,
    width: windowWidth - 70,
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
    backgroundColor: "#235b93",
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