import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
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
  SafeAreaView,
  Button,
} from "react-native";
import firebase from "../shared/firebase";
import AuthForm from "../components/AuthForm";

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

  useEffect(() => {
    subscribeToAuthChanges(onAuthStateChanged);
  });

  const onAuthStateChanged = (user) => {
    if (user !== null) {
      if (user.displayName === "Student") {
        navigation.navigate("Root");
        console.log(user);
      }
      if (user.displayName === "Expert") {
        navigation.navigate("Root");
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
    <AuthForm
      login={login}
      signup={signup}
      authMode={authMode}
      switchAuthMode={switchAuthMode}
    />
  );
}

// export default function Login({navigation, route})
// {
//   const signIn = () => {
//     console.log(value);
//     if (value != '') {
//       navigation.navigate("Root", {
//         navigation: navigation,
//         route: route
//       });
//     }
//   }
//   const [value, onChangeText] = useState('');
//   return (
//     <View>
//       <Text>Username</Text>
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//         onChangeText={text => {console.log(value); onChangeText(text)}}
//         placeholder="Username"
//         value={value}
//       />
//       <Button title="Log In" onPress={() => signIn()}/>
//     </View>
//   );
// }

// Login.navigationOptions = {
//     headerLeft: null,
//   };

// onSubmitEditing
