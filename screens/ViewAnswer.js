import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../shared/firebase";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;
const db = firebase.firestore();

export default function ViewAnswer({ navigation, route }) {
  const { question } = route.params;
  const { questionID } = route.params;

  const [answer, setAnswer] = useState("Answer Pending");

  useEffect(() => {
    getAnswer();
  }, []);

  const getAnswer = async () => {
    let questionsRef = db.collection("Questions");
    let query = questionsRef
      .where(firebase.firestore.FieldPath.documentId(), "==", questionID)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("SNAPSHOT IS EMPTY!!!!!!!!!!!!!!!!!!!!!");
        }
        snapshot.forEach((doc) => {
          if (doc.data().answer === "") {
            return;
          } else {
            const answer = doc.data().answer;
            setAnswer(answer);
          }
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  return (
    <View
      style={{ padding: 10, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          borderRadius: 5,
          backgroundColor: "#378BE5",
          padding: 10,
          width: "92%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 2,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", lineHeight: 20, fontSize: 15 }}>
          <Text style={{ fontSize: 20 }}>Q:</Text> {question}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 5,
          backgroundColor: "#E57359",
          padding: 10,
          width: "92%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 2,
          marginTop: 10,
        }}
      >
        {/* <Button title="get answer " onPress={getAnswer}></Button> */}
        <Text style={{ color: "white", lineHeight: 20, fontSize: 15 }}>
          <Text style={{ fontSize: 20 }}>A:</Text>
          {" " + answer}
        </Text>
      </View>
    </View>
  );
}
