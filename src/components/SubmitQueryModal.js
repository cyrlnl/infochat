import { View, Text, Linking, StyleSheet, ScrollView, Image } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function SubmitQueryModal() {

  const [modalVisible, setModalVisible] = useState(true);

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
        <ScrollView contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>

                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/modal/addsubmit.png')}
                />


              <Text style={{ color: '#222', fontFamily: 'Poppins-Medium', textAlign: 'justify', fontSize: 15 }}>
                It seems like your question/s was/were not in the record yet. To make our service better, you can submit your concerns/inquiries/questions by typing it in the space below so we can review and provide answer for it so we can add this in the record soon.
                {'\n'}
                {'\n'}
                If this concern needs an urgent response, you can send an e-mail at:{'\n'}<Text style={{ textDecorationLine: 'underline', color: '#2c8162' }} onPress={() => Linking.openURL('mailto:info@gordoncollege.edu.ph?subject=Concern&body=Description')}>info@gordoncollege.edu.ph</Text>
                {'\n'}
                {'\n'}
                Kindly wait for our response in your registered E-mail.
                {'\n'}
                {'\n'}
                Thank you. Good day!
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
                  marginVertical: 5,
                  marginBottom: 5
                }}
                onPress={() => setModalVisible(!modalVisible)}
              />

            </View>



          </View>
        </ScrollView>
      </Modal>

      <FAB
        icon={{
          name: 'question',
          type: 'font-awesome',
          size: 21,
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: '#2c8162',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
          width: 30,
          height: 35,
        }}
        containerStyle={{
          opacity: 0.9,
          width: 32,
          height: 31,
          position: 'absolute',
          top: -1,
          right: -3,
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
    marginTop: 70,
  },
  modalView: {
    // height: windowHeight - 150,
    // width: windowWidth - 60,
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
    left: 190
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333'
  },
  tinyLogo: {
    width: 230,
    height: 170,
  }
});