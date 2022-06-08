import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'

const OPTIONS = ['BSCS', 'BSIT', 'BSEMC', 'ACT'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CourseModal({ props }) {

  const onPressItem = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  } 

  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>
          {item}
        </Text>
      </TouchableOpacity>
    )
  })

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => props.changeModalVisibility(false)}
    >
      <View style={[styles.modal, { width: WIDTH - 20, height: HEIGHT / 2 }]}>
        <ScrollView>
            {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10
  },
  option: {
    alignItems: 'flex-start'
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold'
  }
})