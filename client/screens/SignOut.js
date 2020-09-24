import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const SignOut = ({navigation}) => (
    <View>
      <TouchableOpacity
        onPress={ () => navigation.navigate("Login") }>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )

export default SignOut