import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
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
  const signIn = () => {
    console.log(value);
    if (value != '') {
      navigation.navigate("Root", {
        navigation: navigation,
        route: route
      });
    }
  }
  const [value, onChangeText] = useState('');
  return (
    <View>
      <Text>Username</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => {console.log(value); onChangeText(text)}}
        placeholder="Username"
        value={value}
      />
      <Button title="Log In" onPress={() => signIn()}/>
    </View>
  );
}

Login.navigationOptions = {
    headerLeft: null,
  };

// onSubmitEditing