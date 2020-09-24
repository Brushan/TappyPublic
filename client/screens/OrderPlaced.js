import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const OrderPlaced = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.transactionContainer}>
        <Text>Transaction successful</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Taps")}
        >
          <Text>Send Taps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  transactionContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#52A356",
    marginRight: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
});

export default OrderPlaced;
