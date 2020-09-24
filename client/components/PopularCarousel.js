import React, {useEffect, useState}  from 'react'
import { View, Text,  StyleSheet, FlatList, TouchableOpacity, ImageBackground} from 'react-native'
import { connect } from "react-redux";
import { firebase } from "../firebase/config";

const PopularCarousel = ({ navigation, location }) => {
    async function getVendors() {
            const snapshot = await firebase.firestore().collection("vendors").where("info.city", "==", `${location}`).get();
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
          }, []);
        
    const [venues, setVenues] = useState();
    return (
      <View style={styles.listContainer}>
        <FlatList
          horizontal
          keyExtractor={(item) => item.id}
          data={venues}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={()=>navigation.navigate('Send a Tap', {screen: 'VenueList'})}
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
                <Text  style={styles.address}>
                  <Text style={styles.name}>{item.name}{"\n"}</Text>
                  <Text>{item.address}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  listItem: {
    width: 300,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 230,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'column',
    paddingBottom: 5,
    marginBottom: 20
  },
  heading :{
    textAlign: 'center',
    fontFamily:  "Eksell",
    fontSize: 40,
    color: '#36392e',
    paddingBottom: 5,
    paddingTop: 5,
  },
  city: {
    textAlign: 'center',
    color: '#36392e',
    fontSize: 20,
    fontFamily: "Eksell",
    paddingBottom: 10
  },
  imageContainer: {
    flex: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  addressContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  address: {
    fontSize: 15,
    color: "#36392e",
    fontFamily: "Eksell",
  },
  name: {
    fontSize: 23
  }
});

const mapStateToProps = (state) => {
  return {
    location: state.locationReducer.location,
  };
};


export default connect(mapStateToProps)(PopularCarousel);