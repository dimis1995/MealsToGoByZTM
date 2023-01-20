import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {
  useFonts,
  Oswald_400Regular
} from '@expo-google-fonts/oswald';
import {
  Lato_400Regular
} from '@expo-google-fonts/lato';

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvicer } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyDKnIcV68S9ei5fnR0oK3QG3ZrD2RZltMQ",
  authDomain: "mealstogo-9edc6.firebaseapp.com",
  projectId: "mealstogo-9edc6",
  storageBucket: "mealstogo-9edc6.appspot.com",
  messagingSenderId: "783273804897",
  appId: "1:783273804897:web:e0f028f990491ec18a5620"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useFonts({
    Oswald_400Regular,
  });
  const [latoLoaded] = useFonts({
    Lato_400Regular,
  });
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvicer>
          {/* <LocationContextProvicer> */}
          <RestaurantsContextProvider>
            <Navigation />
          </RestaurantsContextProvider>
          {/* </LocationContextProvicer> */}
        </AuthenticationContextProvicer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}