import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import CheckBox from '@react-native-community/checkbox';

import terms from '../components/Terms';
export default function SubmitQueryModal() {

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [complianceModal, setComplianceModal] = useState(true);

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={complianceModal}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={{ marginBottom: 10, color: '#235b93', textAlign: 'center', fontSize: 22, fontFamily: 'Poppins-Regular' }}>Terms and Conditions</Text>
              <Text style={[styles.text, { textAlign: 'justify' }]}>{terms}</Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: '#235b93', false: 'black' }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={styles.text}>Yes, I agree.</Text>
              </View>

              <Button
                title="Continue to the register"
                icon={{
                  name: 'arrow-right',
                  type: 'font-awesome',
                  size: 16,
                  color: 'white',
                }}
                iconContainerStyle={{ left: -10 }}
                iconRight
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, color: '#fff', }}
                buttonStyle={{
                  backgroundColor: toggleCheckBox ? '#235b93' : '#999',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 20,
                }}
                containerStyle={{
                  width: 250,
                  marginVertical: 30,
                  marginBottom: 10
                }}
                disabled={!toggleCheckBox}
                onPress={() => setComplianceModal(false)}
              />

              <Button
                title="Back to the login"
                icon={{
                  name: 'arrow-left',
                  type: 'font-awesome',
                  size: 16,
                  color: 'white',
                }}
                iconContainerStyle={{ left: -10 }}
                iconLeft
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 15, color: '#fff', }}
                buttonStyle={{
                  backgroundColor: '#235b93',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 20,
                }}
                containerStyle={{
                  width: 240,
                  marginVertical: 5,
                  marginBottom: 10
                }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );

}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  modalView: {
    flex: 1,
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
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: -20,
    alignItems: 'center'
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  continueButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: '#333'
  }
});