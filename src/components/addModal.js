import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function addModal() {

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View
      blurRadius={modalVisible ? 4 : 0}
      style={{
        flex: 1,
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>

      {/* TOP */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >

        <View style={styles.centeredView}>
          <View style={styles.triangle} />
          <View style={styles.modalView}>

            <Text style={{
              marginTop: -5,
              marginBottom: -5,
              color: '#2c8162',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
              textTransform: 'uppercase'
            }}>
              Additional question
            </Text>

          </View>
        </View>
      </Modal>

      {/* BOTTOM */}
      {/* <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >

        <View style={styles.centeredView1}>
          <View style={styles.triangle1} />
          <View style={styles.modalView1}>

            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{
                marginTop: -5,
                marginBottom: -5,
                color: '#2c8162',
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                textTransform: 'uppercase'
              }}>
                Categories
              </Text>
            </TouchableOpacity>

          </View>
        </View>


      </Modal> */}
    </View>
  );

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    
  },
  modalView: {
    position: 'absolute',
    top: 30,
    right: -10,
    height: windowHeight - 1000,
    width: windowWidth - 500,
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
  triangle: {
    position: 'absolute',
    top: 25,
    right: 49,
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
  centeredView1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView1: {
    position: 'absolute',
    bottom: 85,
    right: 20,
    height: windowHeight - 1000,
    width: windowWidth - 500,
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
  triangle1: {
    position: 'absolute',
    bottom: 78,
    right: 58,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#2c8162",
    // borderBottomColor: "white",
    transform: [{ rotate: "180deg" }]
  }
});