import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../constants/colors';
const Button = ({ title, onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 40,
        width: 260,
        backgroundColor: '#235b93',
        marginVertical: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        left: 42
      }}>

      <Text style={{ fontFamily: 'Poppins-Regular', color: colors.white, fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;