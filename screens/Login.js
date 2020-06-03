import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import firebase from "../shared/firebase";
import AuthForm from "../components/AuthForm";
import { UserContext } from "../components/UserContext";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export function signout(onSignedOut) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed out");
      onSignedOut();
    });
}

export default function Login({ navigation, route }) {
  const [authMode, setAuthMode] = useState("signup");
  const [myUser, setMyUser] = useContext(UserContext);

  useEffect(() => {
    subscribeToAuthChanges(onAuthStateChanged);
  });

  useEffect(() => {
    if (myUser) {
      navigation.push('Root')
    }
  }, [])

  const onAuthStateChanged = (user) => {
    if (user !== null) {
      if (user.displayName === "Student") {
        setMyUser(user.uid);
        navigation.navigate("Root");
        console.log(user);
      }
      if (user.displayName === "Expert") {
        setMyUser(user.uid);
        navigation.navigate("Answer Questions");
      }
    }
  };

  const switchAuthMode = () => {
    setAuthMode((prevState) => ({
      authMode: prevState.authMode === "signup" ? "login" : "signup",
    }));
  };

  const login = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => console.log(value.user.displayName));
  };

  const signup = ({ email, password, displayName }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo.user);
        userInfo.user.updateProfile({ displayName: displayName.trim() });
      });
  };

  const subscribeToAuthChanges = (authStateChanged) => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      authStateChanged(user);
    });
  };

  return (
    <View style={{ width: deviceWidth, height: deviceHeight }}>
      {/* <Text>BLAHHHH: {myUser}</Text> */}
      <AuthForm
        login={login}
        signup={signup}
        authMode={authMode}
        switchAuthMode={switchAuthMode}
      />
    </View>
  );
}
Login.navigationOptions = {
  header: null,
};
