import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./routes/RootStack";
import { Provider } from "react-redux";

import configureStore from "./store";

import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings('Setting a timer');

const store = configureStore();

const getFonts = () =>
  Font.loadAsync({
    Eksell: require("./assets/fonts/EksellDisplay-Medium.ttf"),
    "NunitoSans-regular": require("./assets/fonts/NunitoSans-Regular.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
