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
    if (value != '') {

      // add user information to system
      try {
        navigation.navigate("Root", {
          navigation: navigation,
          route: route
        });

        await db
          .collection("Users")
          .doc(roll)
          .set({
            username: value,
            roll: roll
          })
          .then(console.log("successfully upload user information")   
          );
      } catch (e) {
        console.error("Error uploading user information: ", e);
      }
    }
  }
  const [value, onChangeText] = useState('');
  const [roll, setRoll] = useState('');
  console.log(roll);

  return (
    <View>
      <Text>Username</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => {console.log(value); onChangeText(text)}}
        placeholder="Username"
        value={value}
      />


      <RadioGroup onSelect = {(index, value) => setRoll(value)}>
        <RadioButton value={'Student'} >
            <Text>Student</Text>
            </RadioButton>
 
            <RadioButton value={'Professor'}>
            <Text>Professor</Text>
             </RadioButton>
      </RadioGroup>

      <Button title="Log In" onPress={() => signIn()}/>
    </View>
  );
}

Login.navigationOptions = {
    headerLeft: null,
  };

// onSubmitEditing