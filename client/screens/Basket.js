import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { removeProduct } from "../actions/basket";
import { firebase } from "../firebase/config";

const getProducts = (state) => {
  const newBasket = [];
  let unique = [...new Set(state.map((obj) => obj.itemId))];

  unique.map((itemId) => {
    const quantity = state.filter((product) => product.itemId === itemId)
      .length;
    const product = state.find((product) => product.itemId === itemId);
    const address = product.vendorAddress.replace(/[^,]*\s\d*\s\d*/, " ");

    newBasket.push({
      item: product.item,
      itemId: product.itemId,
      price: product.price * quantity,
      quantity: quantity,
      vendorName: product.vendorName,
      vendorAddress: address,
    });
  });
  return newBasket;
};

const calculatePrice = (basket) => {
  let totalPrice = 0;

  basket.map((product) => {
    return (totalPrice += parseInt(product.price));
  });

  return totalPrice;
};

const Basket = ({ basket, navigation, removeProduct }) => {
  const [loading, setLoading] = useState(false);
  const checkoutBasket = async (basket) => {
    const usersRef = firebase.firestore().collection("taps");
    await basket.map((tap) => {
      usersRef
        .doc(tap.purchaseId)
        .set(tap)
        .catch((error) => {
          alert(error);
        });
    });
    const res = await axios.post(
      `https://us-central1-tappy-20499.cloudfunctions.net/app/checkout`,
      {
        basketId: basket[0].basketId,
      }
    );
    navigation.navigate("stripeWebview", {
      sessionId: res.data.sessionId,
      orderId: res.data.orderId,
    });
    setLoading(true);
    await navigation.navigate("stripeWebview", {
      sessionId: res.data.sessionId,
      orderId: res.data.orderId,
      loading: loading,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.heading}>Your purchase</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={getProducts(basket)}
          renderItem={({ item }) => (
            <View style={styles.itemList}>
              <Text style={styles.productQuantity}>{item.quantity}x</Text>
              <Text>
                <Text style={styles.productName}>{item.item} </Text>
                <Text style={styles.productPrice}>{item.price}kr</Text>
                {"\n"}
                <Text>{item.vendorName}</Text>
                {"\n"}
                <Text>{item.vendorAddress}</Text>
              </Text>
              <TouchableOpacity style={styles.removeBtn}>
                <Text
                  style={styles.removeBtnTitle}
                  onPress={() => removeProduct(item.itemId)}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.bottomBar}>
        <Text style={styles.total}>Total: {calculatePrice(basket)}kr</Text>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonTitle}
            onPress={() => checkoutBasket(basket)}
          >
            Buy
          </Text>
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
  listContainer: {
    flex: 6,
    backgroundColor: "#EFF0EB",
    marginTop: 50,
  },
  heading: {
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  itemList: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  productQuantity: {
    backgroundColor: "#CDD9C3",
    height: 40,
    width: 40,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 50,
    marginRight: 10,
    ...Platform.select({
      ios: {
        padding: 10,
      },
    }),
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  productPrice: {
    width: 100,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#52A356",
    marginRight: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  removeBtn: {
    backgroundColor: "red",
    borderRadius: 50,
    alignSelf: "center",
    position: "absolute",
    right: 15,
  },
  removeBtnTitle: {
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        padding: 8,
      },
    }),
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#CDD9C3",
  },
  total: {
    marginLeft: 20,
    fontSize: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    basket: state.quantityReducer.basket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProduct: (productId) => dispatch(removeProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
