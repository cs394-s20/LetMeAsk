import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import CameraApp from "./screens/Camera";
import QuestionAnnotation from "./screens/QuestionAnnotation";
import QuestionSubmitted from "./screens/QuestionSubmitted";
import ViewAnswer from "./screens/ViewAnswer";
import PDFDoc from "./screens/PDF";
import Login from './screens/Login';
import LoginInfo from './screens/LoginInfo';
import HomeScreen from './screens/HomeScreen';

import { decode, encode } from "base-64";
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = (byteArray) => {
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random());
  }
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    //Aaron's push needs some changes too
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginInfo" component={LoginInfo} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Camera" component={CameraApp} />
            <Stack.Screen name="Annotate" component={QuestionAnnotation} />
            <Stack.Screen name="Submitted" component={QuestionSubmitted} />
            <Stack.Screen name="Answer" component={ViewAnswer} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
