import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input, TextButton } from '../components'
// service
import {Auth} from '../services'

export default About = ({navigation}) => {

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>ABOUT SCREEN</Text>
        </View>
    )
}