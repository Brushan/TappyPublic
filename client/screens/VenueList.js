import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { firebase } from "../firebase/config";
import LocationModal from "../components/LocationModal";
import { TextInput } from "react-native-gesture-handler";

function Venues({ navigation, location }) {
 
  async function getVendors() {
    const snapshot = await firebase
      .firestore()
      .collection("vendors")
      .where("info.city", "==", `${location}`)
      .get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().info.name,
      img: doc.data().info.img,
      address: doc.data().info.address,
      menu: doc.data().menu,
    }));
    setVenues(data);
  }
  useEffect(() => {
    getVendors();
    return () => {};
  }, [location]);

  const [venues, setVenues] = useState();
  const [visible, setVisible] = useState(false);
  const toggleModal = (state) => setVisible(state);
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        {!location ? (
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.city}>Pick a location</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.city}>{location}</Text>
          </TouchableOpacity>
        )}
        <LocationModal
          visible={visible}
          toggleModal={toggleModal}
        />
      </View>
      <View>
        <TextInput
          style={styles.searchbar}
          placeholder="Search for a bar restaurant or café"
        ></TextInput>
      </View>
      <View style={styles.heading}>
        <Text style={styles.heading}>Venues</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={venues}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={() =>
                navigation.navigate("Venue", {
                  venueID: item.id,
                  venue: item,
                })
              }
            >
              <View style={styles.imageContainer}>
                <ImageBackground
                  style={styles.image}
                  source={{ uri: item.img }}
                  resizeMode="cover"
                  borderTopLeftRadius={10}
                  borderTopRightRadius={10}
                />
              </View>
              <View style={styles.addressContainer}>
                <Text style={styles.address}>
                  <Text style={styles.name}>
                    {item.name}
                    {"\n"}
                  </Text>
                  <Text>{item.address}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#EFF0EB",
    paddingTop: 20,
    paddingBottom: 20,
  },
  listItem: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 230,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "column",
    paddingBottom: 5,
    overflow: 'hidden'
  },
  searchbar: {
    width: "100%",
    backgroundColor: "#EFF0EB",
    textAlign: "center",
    fontSize: 15,
    height: 40,
  },
  heading: {
    textAlign: "center",
    fontFamily: "Eksell",
    fontSize: 24,
    color: "#36392e",
    paddingBottom: 5,
    paddingTop: 5,
  },
  city: {
    textAlign: "center",
    color: "#36392e",
    fontSize: 20,
    fontFamily: "Eksell",
    paddingBottom: 10,
  },
  imageContainer: {
    flex: 3,
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: "100%",
  },
  addressContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  address: {
    fontSize: 15,
    color: "#36392e",
    fontFamily: "Eksell",
  },
  name: {
    fontSize: 23,
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

export default connect(mapStateToProps, mapDispatchToProps)(Venues);
