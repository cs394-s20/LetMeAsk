import * as WebBrowser from "expo-web-browser";
import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  //   Text,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Textarea,
} from "native-base";

import { signout } from "./Login";
import { UserContext } from "../components/UserContext";
import firebase from "../shared/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const db = firebase.firestore();

export default function Response({ navigation, route }) {
  const [answer, setAnswer] = useState("");
  const { questionID } = route.params;
  const { question } = route.params;

  const uploadAnswer = async () => {
    try {
      await db
        .collection("Questions")
        .doc(String(questionID))
        .update({ answer: answer, status: "answered" });
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  };

  return (
    <View>
      {/* <Text style={{ margin: 10 }}>{questionID}</Text> */}
      <Text style={{ margin: 10 }}>{question}</Text>

      <Textarea
        style={{ margin: 10 }}
        onChangeText={(text) => setAnswer(text)}
        rowSpan={5}
        bordered
        placeholder="Enter your response here"
      />
      <Button
        title="Submit"
        onPress={() => {
          uploadAnswer();
          navigation.navigate("Answer Questions");
        }}
      />
    </View>
  );
}
