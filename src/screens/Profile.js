import React, { useState, useEffect } from 'react'
import { View, ScrollView, Alert, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { colors } from '../constants';
import { Account } from '../services'

// service
import { Auth } from '../services'

const Profile = () => {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Account.getProfile()
      .then(acc =>
        setUser(acc),
        setLoading(false)
      )
      .catch(err => Alert.alert(err.code, err.message))
  })

  if (loading) {
    return <ActivityIndicator
      color={colors.primary}
      size='large'
    />
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
    >
      {
        user && user.map((data, index) => (
          <View
            key={index}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text>{data.fullName}</Text>
            <Text>{data.email}</Text>
          </View>
        ))
      }

      <TouchableOpacity onPress={() => Auth.signOut()}>
      <Text>Sign Out</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}





export default Profile