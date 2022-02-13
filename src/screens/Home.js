import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input, TextButton } from '../components'
// service
import {Auth} from '../services'

export default Home = ({navigation}) => {

    const [ email, setEmail ] = useState()

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home</Text>

            <TouchableOpacity onPress={() => Auth.signOut()}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}