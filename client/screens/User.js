import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

const User = ({ navigation, user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profilePicture}
            source={require("../assets/logo.png")}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.profileText}>{user[0].fullName}</Text>
          <Text style={styles.profileText}>{user[0].email}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("Submit a Venue")}
        >
          <FontAwesome5
            style={styles.icon}
            name="store"
            size={24}
            color="#5F6C3B"
          />
          <Text style={styles.profileText}>Submit a Venue</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("Login as Vendor")}
        >
          <FontAwesome5
            style={styles.icon}
            name="store-alt"
            size={24}
            color="#5F6C3B"
          />
          <Text style={styles.profileText}>Vendor Login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("FAQ")}
        >
          <MaterialCommunityIcons
            style={styles.icon}
            name="account-question"
            size={24}
            color="#5F6C3B"
          />
          <Text style={styles.profileText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <Entypo
            style={styles.icon}
            name="megaphone"
            size={24}
            color="#5F6C3B"
          />
          <Text style={styles.profileText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => navigation.navigate("Login")}
        >
          <Entypo
            style={styles.icon}
            name="log-out"
            size={24}
            color="#5F6C3B"
          />
          <Text style={styles.profileText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#EFF0EB",
  },
  header: {
    flex: 1,
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    margin: 10,
  },
  profilePicture: {
    height: 100,
    width: 100,
  },
  body: {
    flex: 2,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
    alignItems: "center",
  },
  userInfo: {
    justifyContent: 'center',
    textAlign: 'center'
  },
  profileText: {
    fontFamily: "NunitoSans-regular",
    fontSize: 24,
    textAlign: 'center'
  },
  icon: {
    marginRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(User);
