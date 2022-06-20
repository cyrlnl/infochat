import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, FAB } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function SubmitModal() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipVisible, setModalTipVisible] = useState(false);
  // const [toolTipVisible, setToolTipVisible] = useState(false);

  goToSubmit = () => {
    navigation.navigate('SubmitQuery')
  }

  closeModal = () => {
    setModalVisible(!modalVisible)
  }

  mergeTwo = () => {
    closeModal();
    goToSubmit();
  }

  return (
    <View
      blurRadius={modalVisible ? 4 : 0}
      style={{
        flex: 1,
        zIndex: 99
      }}>

      {/* SUBMIT MODAL BUTTON */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={{
                marginTop: 5,
                marginBottom: 15,
                color: '#2c8162',
                textAlign: 'center',
                fontSize: 19,
                fontFamily: 'Poppins-Medium',
                textTransform: 'uppercase'
              }}>
                Submit additional question
              </Text>


              <Text style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
                marginBottom: 50,
              }}>
                Have you tried asking your concern to the chatbot?
              </Text>

              <View style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                justifyContent: 'space-evenly',
              }}>

                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonYes]}
                  onPress={() => mergeTwo()}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>


      </Modal>

      {/* SUBMIT MODAL TOOLTIP */}
      <View
        blurRadius={modalVisible ? 4 : 0}
      >
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalTipVisible}
        >

          <View style={styles.centeredView1}>
            <View style={styles.triangle1} />
            <View style={styles.modalView1}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  marginHorizontal: 5,
                  marginRight: 15,
                  color: '#555',
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium'
                }}>
                  Send Additional Question
                </Text>

                <TouchableOpacity
                  onPress={() => { setModalTipVisible(!modalTipVisible); setModalVisible(true); }}
                >
                  <Icon name='closecircle' size={21} color='#2c8162' />
                </TouchableOpacity>
              </View>


            </View>
          </View>
        </Modal>
      </View>

      <FAB
        icon={{
          name: 'plus',
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
        onPress={() => setModalTipVisible(true)}
      />


    </View>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    // height: windowHeight - 100,
    // width: windowWidth - 60,
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
  centeredView1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    margin: -50,
    backgroundColor: 'rgba(0,0,0,0.5)',

  },
  modalView1: {
    position: 'absolute',
    top: 85,
    right: 30,
    height: windowHeight - 1000,
    width: windowWidth - 500,
    backgroundColor: 'white',
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#999',
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
  triangle1: {
    position: 'absolute',
    top: 75,
    right: 100,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  },
  button: {
    width: 100,
    padding: 5,
    paddingVertical: 5,
    justifyContent: 'space-evenly',
    bottom: 10,
    borderRadius: 20,
    elevation: 2,
    marginLeft: 30,
    marginRight: 30
  },
  buttonYes: {
    backgroundColor: "#2c8162",
  },
  buttonClose: {
    backgroundColor: "#DB4437",
  },
  textStyle: {
    fontSize: 13,
    color: "white",
    fontFamily: 'Poppins-Medium',
    textAlign: "center"
  }
});