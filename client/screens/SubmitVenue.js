import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image
} from "react-native";

const SubmitVenue = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/img/siebe-warmoeskerken-R3iAcQxylmE-unsplash.jpg')} />
      <View style={styles.addVenueContainer}>
        <Text style={styles.addVenue}>
          Want to support your local cafe, bar or restaurant, but don't see it
          listed?
        </Text>
      </View>
      <View style={styles.onboardContainer}>
        <Text style={styles.onboard}>
          Send their details to the email below, and we'll onboard them ASAP!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Linking.openURL(
              "mailto:support@example.com?subject=SendMail&body=Description"
            )
          }
          title="support@example.com"
        >
          <Text style={styles.submitVenue}> Send the details </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7f0dd",
  },
  image: {
    flex: 2,
    width: '100%'
  },
  button: {
    backgroundColor: "#5F6C3B",
    padding: 20,
    borderRadius: 5,
    marginBottom: 40
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  addVenueContainer: {
    flex: 0.5,
    marginTop: 10,
  },
  addVenue: {
    fontFamily: "Eksell",
    color: "#000",
    fontSize: 24,
    padding: 10
  },
  onboardContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  onboard: {
    fontFamily: "NunitoSans-regular",
    color: "#000",
    fontSize: 18,
    padding: 10
  },
  submitVenue: {
    fontFamily: "Eksell",
    color: "white",
    fontSize: 24
  },
});

export default SubmitVenue;
