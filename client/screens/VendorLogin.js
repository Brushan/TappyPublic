import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const VendorLogin = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.vendorLogin}> Vendor Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e7f0dd",
  },
  button: {
    backgroundColor: "#5F6C3B",
    padding: 20,
    borderRadius: 10,
  },
  vendorLogin: {
    fontFamily: "Eksell",
    color: "white",
    fontSize: 24,
  },
});

export default VendorLogin;
