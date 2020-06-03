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
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import ProfessorHome from "./screens/ProfessorHome";
import Response from "./screens/Response";
import MyQuestions from "./screens/MyQuestions";

import { UserProvider } from "./components/UserContext";

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
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <UserProvider>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerLeft: null }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Camera" component={CameraApp} />
              <Stack.Screen name="Annotate" component={QuestionAnnotation} />
              <Stack.Screen name="Submitted" component={QuestionSubmitted} />
              <Stack.Screen name="Answer" component={ViewAnswer} />
              <Stack.Screen
                name="Answer Questions"
                component={ProfessorHome}
                options={{ headerLeft: null }}
              />
              <Stack.Screen name="Respond" component={Response} />
              <Stack.Screen name="My Questions" component={MyQuestions} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </UserProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
