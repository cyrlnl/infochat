import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../constants'

export default Input = ({placeholder, value, onChangeText, secureTextEntry}) => {
    return(
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.primary}
            style={styles.inputContainer}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        width: 300,
        height: 50,
        borderColor: '#262626',
        borderWidth: 1.5,
        marginVertical: 5,
        color: colors.black,
        fontSize: 16,
        borderRadius: 10,
        paddingHorizontal: 10
    }
})