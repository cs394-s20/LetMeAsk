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

export default function LoginInfo({navigation, route}) {
    const { username } = route.params;
    console.log("logininfo: " + username);
    const db = firebase.firestore();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [uni, setUni] = useState('');
    const register = async () => {
        if (name != '' && role != '' && uni != '') {
            try {
                navigation.navigate("Root", {
                  navigation: navigation,
                  route: route
                });
        
                await db
                  .collection("Users")
                  .doc(username)
                  .set({
                    name: name,
                    role: role,
                    university: uni
                  })
                  .then(console.log("successfully upload user information")   
                  );
              } catch (e) {
                console.error("Error uploading user information: ", e);
              }
        }
    }
    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => {console.log(name); setName(text)}}
                placeholder="Name"
                value={name}
            />
             <RadioGroup onSelect = {(index, value) => setRole(value)}>
                <RadioButton value={'Student'} >
                    <Text>Student</Text>
                </RadioButton>
                <RadioButton value={'Professor'}>
                    <Text>Professor</Text>
                </RadioButton>
            </RadioGroup>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => {console.log(uni); setUni(text)}}
                placeholder="University"
                value={uni}
            />
      <Button title="Register" onPress={() => register()}/>
        </View>
    )
}