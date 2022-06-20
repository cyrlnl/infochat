import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import CheckBox from '@react-native-community/checkbox';

import terms from '../components/Terms';
import dataPolicy from '../components/dataPolicy';
export default function TermsCondition() {

  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [policyModalVisible, setPolicyModalVisible] = useState(false);

  return (
    <View>
      {/* TERMS AND CONDITION */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={termsModalVisible}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>

              <Text style={{ marginBottom: 10, color: '#2c8162', textAlign: 'center', fontSize: 22, fontFamily: 'Poppins-Regular' }}>Terms and Conditions</Text>

              <Text style={[styles.text, { fontSize: 16, textAlign: 'center' }]}>
                Welcome to Gordon College Informational Chatbot!
              </Text>
              <Text style={[styles.text, { textAlign: 'justify', margin: 5 }]}>
                {terms}
              </Text>

              <Text style={[styles.text, { textAlign: 'justify', margin: 5 }]}>
                If you have any questions about these Terms and Conditions, you can contact us:{'\n'}
                By visiting our Facebook Page:{'\n'}Gordon College Informational Chatbot
                By sending us an e-mail:{'\n'}<Text style={{ textDecorationLine: 'underline', color: '#2c8162' }} onPress={() => Linking.openURL('mailto:info@gordoncollege.edu.ph?subject=Concern&body=Description')}>codebrewers.ccs@gmail.com</Text>
              </Text>

              <Button
                title="OKAY"
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
                  marginBottom: 10
                }}
                onPress={() => setTermsModalVisible(!termsModalVisible)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* DATA POLICY */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={policyModalVisible}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>

              <Text style={{ marginBottom: 10, color: '#2c8162', textAlign: 'center', fontSize: 22, fontFamily: 'Poppins-Regular' }}>DATA PRIVACY POLICY</Text>

              <Text style={[styles.text, { fontSize: 16, textAlign: 'center' }]}>
                Welcome to Gordon College Informational Chatbot!
              </Text>
              <Text style={[styles.text, { textAlign: 'justify', margin: 5 }]}>
                {dataPolicy}
              </Text>

              <Text style={[styles.text, { textAlign: 'justify', margin: 5, marginTop: -130 }]}>
                Gordon College Informational Chatbot{'\n'}
                <Text style={{ textDecorationLine: 'underline', color: '#2c8162' }} onPress={() => Linking.openURL('mailto:info@gordoncollege.edu.ph?subject=Concern&body=Description')}>codebrewers.ccs@gmail.com</Text>{'\n'}
                Tapinac Sports Complex, Donor St{'\n'}
                Olongapo City, Zambales 2200{'\n'}
                Philippines
              </Text>

              <Button
                title="OKAY"
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
                  marginBottom: 10
                }}
                onPress={() => setPolicyModalVisible(!policyModalVisible)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Text
        style={{
          color: colors.black,
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
          fontSize: 14,
          top: 40
        }}>
        By signing in, you agree to our <Text style={{ color: '#2c8162'}} onPress={() => setTermsModalVisible(true)}>Terms and Condition</Text> and <Text style={{ color: '#2c8162'}} onPress={() => setPolicyModalVisible(true)}>Data Privacy Policy</Text>.
      </Text>

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