import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { increment, decrement } from "../actions/basket";

const generateUuid = () => {
  let date = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const basketId = generateUuid();

const ItemQuantity = ({ venue, item, basket, increase, decrease, user }) => {
  const count = basket.filter((product) => product.itemId === item.itemId)
    .length;

  const product = {
    item: item.item,
    itemId: item.itemId,
    vendorName: venue.params.venue.name,
    vendorAddress: venue.params.venue.address,
    purchaseId: generateUuid(),
    price: item.price,
    userId: user[0].userId,
    fullName: user[0].fullName,
    date: new Date().toISOString(),
    sent: false,
    isRedeemed: false,
    type: item.type,
    sentTo: "",
    redeemedStyle: false,
    basketId: basketId,
    isPaid: false,
  };

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity style={styles.quantityButton}>
        <AntDesign
          name="minuscircle"
          size={40}
          color="#CED1C6"
          onPress={() => {
            decrease(item.itemId);
          }}
        />
      </TouchableOpacity>
      <Text style={styles.inputField}>{count}</Text>
      <TouchableOpacity style={styles.quantityButton}>
        <AntDesign
          name="pluscircle"
          size={40}
          color="#CED1C6"
          onPress={() => {
            increase(product);
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  inputField: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    padding: 5,
    textAlign: "center",
    color: "gray",
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    basket: state.quantityReducer.basket,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increase: (product) => dispatch(increment(product)),
    decrease: (productId) => dispatch(decrement(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemQuantity);
