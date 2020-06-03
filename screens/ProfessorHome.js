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
} from "native-base";

import { signout } from "./Login";
import { UserContext } from "../components/UserContext";
import firebase from "../shared/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const db = firebase.firestore();

export default function ProfessorHome({ navigation, route }) {
  const [myQuestions, setMyQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const onSignedOut = () => {
    console.log("signed out");
    navigation.navigate("Login");
  };

  const getAllQuestions = async () => {
    let questionsRef = db.collection("Questions");
    let query = questionsRef
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("SNAPSHOT IS EMPTY!!!!!!!!!!!!!!!!!!!!!");
        }
        snapshot.forEach((doc) => {
          const question = doc.data().question;
          const questionID = doc.id;
          const questionObj = { id: questionID, question: question };
          setMyQuestions((oldArray) => [...oldArray, questionObj]);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  const QuestionList = () =>
    myQuestions.map((question, index) => (
      <CardItem
        button
        key={index}
        onPress={() =>
          navigation.navigate("Respond", {
            route: route,
            questionID: myQuestions[index].id,
            question: myQuestions[index].question,
          })
        }
      >
        <Text>{question.question}</Text>
        <Right>
          <MaterialCommunityIcons
            name="chevron-right"
            size={50}
            color="#378BE5"
          />
        </Right>
      </CardItem>
    ));

  return (
    <View>
      <Button title="Sign Out" onPress={() => signout(onSignedOut)}></Button>
      {/* <Button title="GET QUESITONS" onPress={getAllQuestions}></Button> */}
      <Text>PROFESSOR HOME</Text>
      <QuestionList />
    </View>
  );
}
