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

              <Text style={{ marginBottom: 10, marginTop: 10, color: '#2c8162', textAlign: 'center', fontSize: 21, fontFamily: 'Poppins-Regular' }}>
                How GC InfoChat Works?
              </Text>


              <Image
                style={styles.tinyLogo}
                source={require('../assets/modal/howInfochat.png')}
              />

              <Text style={{ color: '#222', fontFamily: 'Poppins-Medium', textAlign: 'justify', fontSize: 15 }}>
                From the provided categories, you can choose any by tapping the button to display pre-set questions under that category. Once pre-set questions appears, you can choose from those by clicking the desired question. In case, your question is not in the provided question, you can type it in the text box.
                {'\n'}
                {'\n'}
                If you are not satisfied with the answers given by the chat bot, you can click the '<Text style={{ color: '#2c8162', fontSize: 18 }}>+</Text>' sign placed on the upper right corner of the screen and submit your question there so we can review it and will be added to the record soon.
                {'\n'}
                {'\n'}
                If you have more questions, feel free to contact us:{'\n'}<Text style={{ textDecorationLine: 'underline', color: '#2c8162', textAlign: 'center' }} onPress={() => Linking.openURL('mailto:codebrewers.ccs@gmail.com?subject=Concern&body=Description')}>codebrewers.ccs@gmail.com</Text>
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
                  marginVertical: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    // height: windowHeight - 100,
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
    top: -10,
    left: 250
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333'
  },
  tinyLogo: {
    marginBottom: 10,
    width: 150,
    height: 150,
  }
});