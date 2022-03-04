// import React from 'react';
// import { Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { colors } from '../constants';

// export default Button = ({buttonText, onPress, backgroundColor, color}) => {
//     return(
//         <TouchableOpacity onPress= {onPress} style={[styles.button, {backgroundColor: backgroundColor || colors.primary}]}>
//             <Text style={[styles.text, {color: color || colors.white}]}>{buttonText}</Text>
//         </TouchableOpacity>
//     )
// }

// const styles = StyleSheet.create({
//     button:{
//         width: 200,
//         height: 45,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: 1,
//         borderRadius: 10
//     },
//     text:{
//         fontSize: 16,
//         fontWeight: 'bold'
//     }
// })

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import colors from '../constants/colors';
const SocialButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: colors.google,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialButton;