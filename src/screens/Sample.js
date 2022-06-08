import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'

import {CourseModal} from '../components/CourseModal';

export default function Sample() {

  const [chooseData, setChooseData] = useState('Select item')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool)
  }

  const setData = (option) => {
    setChooseData(option)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => changeModalVisibility(true)}
      >
        <Text style={styles.text}>{chooseData}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType='fade'
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <CourseModal
          changeModalVisibility={changeModalVisibility}
          setData={setData}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  text: {
    marginVertical: 20,
    fontSize: 25
  },
  touchableOpacity: {
    alignSelf: 'stretch',
    paddingHorizontal: 20
  }
})