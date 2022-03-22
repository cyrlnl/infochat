import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Button = ({ title, btnType,
  color, onPress = () => { } }) => {
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
        left: 42,
        // flexDirection: 'row',
      }}>
      <Text style={{ fontFamily: 'Poppins-Regular', color: colors.white, fontSize: 18 }}>
        {title}
      </Text>

      {/* <View style={{
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AntDesign name={btnType} style={{ fontWeight: 'bold', }} size={22} color={color} />
      </View> */}

    </TouchableOpacity>
  );
};

export default Button;