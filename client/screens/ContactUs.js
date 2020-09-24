import React from 'react'
import { View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native'

const ContactUs = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.link} onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
            title="support@example.com">
                <Text style={styles.contactUs}>Contact us at support@tappy.co </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      backgroundColor: "#e7f0dd",

    },
    link: {
      backgroundColor: "#5F6C3B",
      padding: 20,
      borderRadius: 10
    },
    contactUs: {
      fontFamily: 'Eksell',
      color: 'white',
      fontSize: 24
    },
    
  });

export default ContactUs