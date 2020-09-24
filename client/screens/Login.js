import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { firebase } from "../firebase/config";
import { connect } from "react-redux";
import { userToState } from "../actions/basket";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";

function LoginScreen({ navigation, user, userToState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            userToState(user);
            navigation.navigate("bottomNav", { user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.heading}>Sign In</Text>
          <View style={styles.inputContainer}>
            <Feather style={styles.icon} name="user" color="#000" size={16} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons
              style={styles.icon}
              name="lock"
              color="#000"
              size={16}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#e7f0dd",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  bodyContainer: {
    backgroundColor: "white",
    width: "100%",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    marginTop: 20,
    fontSize: 60,
    fontFamily: "Eksell",
    color: "#36392e",
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1.3,
    borderColor: "black",
    width: "70%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    marginTop: 30,
  },
  input: {
    width: "80%",
  },
  icon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#5f6c3b",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "grey",
  },
  footerLink: {
    color: "#5f6c3b",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userToState: (user) => dispatch(userToState(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
