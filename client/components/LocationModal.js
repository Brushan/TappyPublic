import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { locationToState } from "../actions/basket";

const LocationModal = ({ visible, toggleModal, location, locationToState }) => {
  const [cityVisibility, setCityVisibility] = useState({});
  const [country, setCountry] = useState([
    {
      name: "Sweden",
      cities: ["Stockholm", "Malmö", "Lund", "Göteborg"],
      flag: require("../assets/flags/sweden.png"),
      key: "1",
    },
    {
      name: "Norway",
      cities: ["Trondheim", "Oslo", "Bergen"],
      flag: require("../assets/flags/norway.png"),
      key: "2",
    },
    {
      name: "United Kingdom",
      cities: [
        "Sheffield",
        "Nottingham",
        "New Castle",
        "Manchester",
        "London",
        "Liverpool",
        "Leeds",
        "Glasgow",
        "Edinburgh",
        "Chesterfield",
        "Cardiff",
        "Bristol",
        "Birmingham",
      ],
      flag: require("../assets/flags/uk.png"),
      key: "3",
    },
    {
      name: "Denmark",
      cities: ["Odense", "Copenhagen", "Århus"],
      flag: require("../assets/flags/denmark.png"),
      key: "4",
    },
  ]);

  const locationSetter = (event) => {
    locationToState(event._dispatchInstances.memoizedProps.children);
    toggleModal(false);
    setCityVisibility({});
  };

  const findCountry = (countryObject, state) => {
    let included = false;
    if (state.includes(countryObject)) {
      included = true;
    }
    return included;
  };
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Select a Country</Text>
          </View>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggleModal(false)}
            >
              <AntDesign name="closecircle" size={30} color="#5F6C3B" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.countriesContainer}>
          <FlatList
            data={country}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (cityVisibility === item) {
                        setCityVisibility({});
                      } else {
                        const countryInfo = country.find(
                          (country) => country.name === item.name
                        );
                        setCityVisibility(countryInfo);
                      }
                    }}
                    style={styles.listItem}
                  >
                    <View>
                      <Image style={styles.imageStyle} source={item.flag} />
                    </View>
                    <View>
                      <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {item === cityVisibility ? (
                  <View style={styles.cities}>
                    <FlatList
                      data={item.cities}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <View>
                          <TouchableOpacity style={styles.city}>
                            <Text
                              style={styles.cityText}
                              onPress={locationSetter}
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    ></FlatList>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            )}
          ></FlatList>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  countriesContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 100,
  },
  imageStyle: {
    height: 50,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 24,
    fontFamily: "Eksell",
  },
  cities: {
    justifyContent: "center",
  },
  city: {
    justifyContent: "center",
  },
  cityText: {
    fontFamily: "NunitoSans-regular",
    fontSize: 18,
    marginLeft: 40,
  },
  closeButtonContainer: {
    color: "white",
  },
  closeButton: {
    marginRight: 10,
  },
  header: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "#E7F0DD",
    fontFamily: "Eksell",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Eksell",
    fontSize: 24,
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    location: state.locationReducer.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    locationToState: (location) => dispatch(locationToState(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationModal);