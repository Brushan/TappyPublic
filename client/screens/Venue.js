import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import MenuItem from "../components/MenuItem.js";
import ItemQuantity from "../components/ItemQuantity.js";

const Venue = ({ route }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: route.params.venue.img }}
        />
        <Text style={styles.heading}> {route.params.venue.name}{"\n"}</Text>
      </View>
      
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={route.params.venue.menu}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity style={styles.productGroup}>
                <MenuItem item={item} />
              </TouchableOpacity>
              <ItemQuantity
                key = {item.id}
                venue={route}
                item={item}
                style={styles.quantityGroup}
              />
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
  },
  listContainer: {
    flex: 3,
    marginTop: 10
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden'
  },
  productGroup: {
    flex: 2,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imageBackground: {
    opacity: 0.9,
    width: "100%",
    height: "100%",
    
  },
  heading: {
    position: 'absolute',
    fontSize: 40,
    color: "white",
    fontFamily: "Eksell",
  },
});

export default Venue;
