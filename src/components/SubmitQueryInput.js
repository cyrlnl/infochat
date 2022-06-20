import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { windowHeight, windowWidth } from '../utils/Dimensions';
const SubmitQueryInput = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => { },
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
                ? '#2c8162'
                : '#2c8162',
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{ color: '#2c8162', fontSize: 27, marginRight: 10, top: -16 }}
        />
        <TextInput
          autoCorrect={false}
          
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{
            fontSize: 15,
            fontFamily: 'Poppins-Regular',
            color: colors.black,
            flex: 1,
          }}
          {...props}
        />
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: colors.red, fontSize: 12, left: 15, }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    left: 5,
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
  inputContainer: {
    height:100,
    textAlignVertical: 'top',
    backgroundColor: colors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10
  },
});

export default SubmitQueryInput;