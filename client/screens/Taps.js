import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import { firebase } from "../firebase/config";
import { connect } from "react-redux";

const Taps = ({ user }) => {
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    id: "",
    name: "",
  });
  const [taps, setTaps] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection("taps")
      .where("sentTo", "==", user[0].email)
      .where("isRedeemed", "==", false)
      .where("sent", "==", true)

      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTaps(data);
      });
    return () => {};
  }, []);

  const onRedeemPress = (id) => {
    firebase.firestore().collection("taps").doc(id).update({
      redeemedStyle: true,
    });
    setTimeout(() => {
      firebase.firestore().collection("taps").doc(id).update({
        isRedeemed: true,
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Do you want to redeem your tap?
            </Text>
            <Text style={styles.modalProduct}>{modalVisible.name}</Text>
            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelBtn]}
                onPress={() => {
                  setModalVisible({
                    visible: !modalVisible.visible,
                  });
                }}
              >
                <Text style={styles.cancelBtnTitle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.redeemBtn]}
                onPress={() => {
                  setModalVisible({
                    visible: !modalVisible.visible,
                  });
                  onRedeemPress(modalVisible.id);
                }}
              >
                <Text style={styles.redeemBtnTitle}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.listContainer}>
        <FlatList
          horizontal
          keyExtractor={(item) => item.id}
          data={taps}
          renderItem={({ item }) => (
            <View
              style={
                item.redeemedStyle === false ? styles.card : styles.redeemedCard
              }
            >
              <View style={styles.header}>
                <Text style={styles.name}>{item.vendorName}</Text>
                <Text style={styles.address}>{item.vendorAddress}</Text>
              </View>
              <View style={styles.category}>
                <Image
                  style={styles.giftImage}
                  source={require("../assets/img/espresso_gold.png")}
                />
              </View>
              <Text style={styles.item}>{item.item}</Text>
              <Text>
                {item.fullName}
                <Text> </Text>
                has sent you a Tap!
              </Text>
              <TouchableOpacity
                style={styles.redeem}
                onPress={() => {
                  setModalVisible({
                    visible: !modalVisible.visible,
                    id: item.id,
                    name: item.item,
                  });
                }}
              >
                <Text style={styles.redeemText}>Redeem your Tap!</Text>
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
    backgroundColor: "#EFF0EB",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#E7F0DD",
    borderRadius: 5,
    height: 180,
    width: 260,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4,
  },
  modalTitle: {
    position: "absolute",
    top: 20,
    fontSize: 15,
  },
  modalProduct: {
    position: "absolute",
    top: 60,
    fontSize: 20,
    fontFamily: "Eksell",
  },
  modalBtnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#D6D4D0",
  },
  button: {
    backgroundColor: "#F0EDE9",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
  },
  cancelBtn: {
    borderBottomLeftRadius: 10,
  },
  cancelBtnTitle: {
    color: "red",
  },
  redeemBtnTitle: {
    color: "#73DA7A",
  },
  redeemBtn: {
    borderBottomRightRadius: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#D6D4D0",
  },
  header: {
    width: "100%",
    backgroundColor: "#E7F0DD",
    height: 75,
    margin: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  name: {
    fontFamily: "Eksell",
    fontSize: 24,
    alignSelf: "center",
    marginTop: 10,
  },
  address: {
    fontFamily: "NunitoSans-regular",
    fontSize: 16,
    alignSelf: "center",
  },
  category: {
    height: 80,
    width: 80,
    backgroundColor: "#E7F0DD",
    borderRadius: 50,
    overflow: "hidden",
    margin: 10,
  },
  giftImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  card: {
    margin: 20,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  redeemedCard: {
    flex: 1,
    backgroundColor: "#c1d392",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardText: {
    fontSize: 20,
    lineHeight: 40,
    color: "#36392e",
    textAlign: "center",
    fontFamily: "NunitoSans-regular",
  },
  redeem: {
    textAlign: "center",
    backgroundColor: "#5f6c3b",
    borderRadius: 5,
    margin: 20,
  },
  redeemText: {
    color: "white",
    fontSize: 25,
    padding: 20,
  },
  item: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Taps);
