import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const MenuItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: item.img }} />
      </View>
      <Text style={styles.item}>
        <Text
          style={styles.itemName}
        >
          {item.item}
          {"\n"}
          </Text>
          <Text
            style={[
              styles.itemPrice,
              ,
            ]}
          >
            {item.price}
          </Text>
        
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  item: {
    flex: 1,
    color: "black",
    fontFamily: "Eksell",
    fontSize: 16,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1,
    flexDirection: "row",
  },
});

export default MenuItem;
