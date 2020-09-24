import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { firebase } from '../firebase/config';
import { connect } from "react-redux";
import axios from 'axios';

const Unsent = ({ user }) => {
  const [taps, setTaps] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection('taps')
      .where('userId', "==", user[0].userId)
      .where('sent', "==", false)
      .where('isRedeemed', "==", false)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setTaps(data)
      })
      return () => {
      }
  }, [])

  const onSendPress = async (id) => {
    firebase.firestore().collection('taps').doc(id).update({
      sent: true,
      sentTo: text,
    });
    await axios.post(`https://us-central1-tappy-20499.cloudfunctions.net/app/contact`, {
      to: text,
      subject: `${user[0].fullName} has sent you a tap`,
      text: `You have gotten a tap for a free product on Tappy. Log in to your account to see your tap. 
      If you don't have the app please download it from the app store or play store to collect your free product`
    });
  };

  return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={taps}
            renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.cardText}>
                      <Text style={styles.item}>
                        {item.item}
                        {'\n'}
                      </Text>
                      <Text>
                        {item.vendorName}
                        {'\n'}
                        {item.vendorAddress}
                        {'\n'}
                      </Text>
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={(text) => setText(text)}
                      placeholder='Enter an email address'
                      >
                          </TextInput>
                    <TouchableOpacity
                      style={styles.send}
                      onPress={() => onSendPress(item.id)}
                    >
                      <Text style={styles.sendText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                )}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.3,
    width: '80%',
    borderRadius: 5,
    fontSize: 20,
    paddingLeft: 5,
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 40,
    fontFamily: "Eksell",
    color: '#36392e'
  },
  card: {
    paddingTop: 10,
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    margin: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#36392e',
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Eksell',
  },
  send: {
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5f6c3b',
    borderRadius: 10,
    marginTop: 10
  },
  sendText: {
    color: 'white',
    fontSize: 25,
    padding: 15
  },
  item: {
    marginTop: 30,
    fontSize: 30,
  },
  logo: {
    marginTop: 450,
    width: 150,
    height: 150,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#EFF0EB',
  },
  listItem: {
    flex: 1,
    margin: 10,
    height: 100,
    overflow: 'hidden',
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Unsent);