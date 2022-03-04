// import React from 'react';
// import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// import { colors } from '../constants';

// export default Button = ({buttonText, onPress}) => {
//     return(
//         <TouchableOpacity onPress= {onPress} style={styles.button}>
//             <Text style={styles.text}>{buttonText}</Text>
//         </TouchableOpacity>
//     )
// }

// const styles = StyleSheet.create({
//     button:{
//         backgroundColor: colors.primary,
//         width: 200,
//         height: 45,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: 20,
//         borderRadius: 10
//     },
//     text:{
//         color: colors.white,
//         fontSize: 16,
//         fontWeight: 'bold',
//     }
// })

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import colors from '../constants/colors';
const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: '#235b93',
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

export default Button;