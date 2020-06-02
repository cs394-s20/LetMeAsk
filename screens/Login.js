import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
//use yarn add react-native-flexi-radio-button
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
//firebase thing
import firebase from "../shared/firebase";

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

export default function Login({navigation, route})
{
  const db = firebase.firestore();

  const signIn = async () => {
    console.log(value);
    console.log("username" + db.collection("Users").doc(value));
    if (value != '') {
        db.collection("Users").doc(value).get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    navigation.navigate("Root", {
                        navigation: navigation,
                        route: route
                    });
                } else {
                    navigation.navigate("LoginInfo", {
                        navigation: navigation,
                        route: route,
                        username: value
                    });
                }
            });

    }
  }
  const [value, onChangeText] = useState('');
  const [role, setRole] = useState('');
  console.log(role);

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => {console.log(value); onChangeText(text)}}
        placeholder="Username"
        value={value}
      />

    {/**
      <RadioGroup onSelect = {(index, value) => setRole(value)}>
        <RadioButton value={'Student'} >
            <Text>Student</Text>
            </RadioButton>
 
            <RadioButton value={'Professor'}>
            <Text>Professor</Text>
             </RadioButton>
    </RadioGroup>*/}

      <Button title="Log In" onPress={() => signIn()}/>
    </View>
  );
}

Login.navigationOptions = {
    headerLeft: null,
  };

// onSubmitEditing