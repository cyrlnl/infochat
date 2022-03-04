// import React from 'react';
// import { TextInput, StyleSheet } from 'react-native';
// import { colors } from '../constants'

// export default Input = ({placeholder, value, onChangeText, secureTextEntry}) => {
//     return(
//         <TextInput
//             placeholder={placeholder}
//             placeholderTextColor={colors.primary}
//             style={styles.inputContainer}
//             value={value}
//             onChangeText={onChangeText}
//             secureTextEntry={secureTextEntry}
//         />
//     )
// }

// const styles = StyleSheet.create({
//     inputContainer:{
//         width: 300,
//         height: 50,
//         borderColor: '#262626',
//         borderWidth: 1.5,
//         marginVertical: 5,
//         color: colors.black,
//         fontSize: 16,
//         borderRadius: 10,
//         paddingHorizontal: 10
//     }
// })

import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.darkBlue
              : colors.light,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: '#235b93', fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: colors.black, flex: 1}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: '#235b93', fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: colors.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: colors.black,
  },
  inputContainer: {
    height: 55,
    backgroundColor: colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default Input;