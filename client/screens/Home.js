import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PopularCarousel from "../components/PopularCarousel";

const Home = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.giftText}>I want to gift</Text>
        <View style={styles.giftType}>
          <View>
            <TouchableOpacity style={styles.category} onPress={()=>navigation.navigate('Send a Tap', {screen: 'VenueList'})}>
              <Image
                style={styles.giftImage}
                source={require("../assets/img/WhiteBulle.png")}
              />
            </TouchableOpacity>
            <Text style={styles.giftName}>Fika</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.category} onPress={()=>navigation.navigate('Send a Tap', {screen: 'VenueList'})}>
              <Image
                style={styles.giftImage}
                source={require("../assets/img/BeerStein.png")}
              />
            </TouchableOpacity>
            <Text style={styles.giftName}>Beer</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.category} onPress={()=>navigation.navigate('Send a Tap', {screen: 'VenueList'})}>
              <Image
                style={styles.giftImage}
                source={require("../assets/img/RedWine.png")}
              />
            </TouchableOpacity>
            <Text style={styles.giftName}>Wine</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.category} onPress={()=>navigation.navigate('Send a Tap', {screen: 'VenueList'})}>
              <Image
                style={styles.giftImage}
                source={require("../assets/img/Espresso.png")}
              />
            </TouchableOpacity>
            <Text style={styles.giftName}>Coffee</Text>
          </View>
        </View>
        <View style={styles.viewAll}>
          <TouchableOpacity onPress={()=>navigation.navigate('Send a Tap', {screen: 'VenueList'})} style={styles.venuesButton}>
            <Text style={styles.venuesButtonsText}>View all venues</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.popularText}>Popular Locations</Text>
          <PopularCarousel navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 350,
    backgroundColor: "#EFF0EB",
  },
  giftText: {
    fontFamily: "Eksell",
    fontSize: 28,
    color: "#36392e",
    alignSelf: "center",
    marginTop: 100,
    margin: 20,
  },
  giftType: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  category: {
    height: 80,
    width: 80,
    backgroundColor: "#FFE6D3",
    borderRadius: 50,
    overflow: "hidden",
  },
  giftImage: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  giftName: {
    alignSelf: "center",
    fontFamily: "NunitoSans-regular",
    marginTop: 5,
    fontFamily: "Eksell",
    color: "#36392e",
  },
  viewAll: {
    alignItems: "center",
  },
  venuesButton: {
    borderColor: "#5F6C3B",
    borderRadius: 5,
    borderWidth: 1,
    width: "90%",
    textAlign: "center",
    margin: 20,
  },
  venuesButtonsText: {
    padding: 8,
    fontFamily: "NunitoSans-regular",
    alignSelf: "center",
    fontSize: 12,
  },
  popularText: {
    fontFamily: "Eksell",
    fontSize: 28,
    color: "#000",
    alignSelf: "center",
    margin: 20,
  },
});

export default Home;
