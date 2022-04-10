import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import colors from '../constants/colors';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Button = ({ title, btnType,
  color, onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '100%',
        height: windowHeight / 18,
        backgroundColor: '#235b93',
        marginVertical: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', color: colors.white, fontSize: 18 }}>
        {title}
      </Text>

    </TouchableOpacity>
  );
};

export default Button;