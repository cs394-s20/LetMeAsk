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

export default function PageDirectory({ navigation, route }) {
  const { ISBN, pages, questions } = route.params;

  const getPhoto = async (page) => {
    let booksRef = db.collection("Books");
    let questionsRef = db.collection("Questions");
    var uri;
    //--------- added logic to handle case where ISBN + / + pageNumber doesn't exist in firebase storage ----------
    const ref2 = firebase.storage().ref(ISBN + "/" + page);
    console.log("HELLO" + ref2);

    //----- CASE 1: where there ISBN + / + pageNumber already exists in storage ------
    ref2
      .getDownloadURL()
      .then((url) => {
        let query = booksRef
          .where(firebase.firestore.FieldPath.documentId(), "==", ISBN)
          .where("pages", "array-contains", page)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              console.log("SNAPSHOT EMPTY");
            }
            snapshot.forEach((doc) => {
              doc.data().questions.forEach((question) =>
                questionsRef
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    question
                  )
                  .where("page", "==", page)
                  .get()
                  .then((snapshot) => {
                    if (snapshot.empty) {
                      console.log("SNAPSHOT EMPTY");
                      return;
                    } else {
                      snapshot.forEach((doc) => {
                        console.log(doc.data().image);
                        uri = url;
                        console.log("HELLOOOOO" + uri);
                        navigation.setParams({ photo_uri: uri });
                        console.log("=========" + uri);
                        navigation.navigate("Page", {
                          route: route,
                          navigation: navigation,
                          photo_uri: uri,
                          ISBN: ISBN,
                          pageNumber: page,
                        });
                      });
                    }
                  })
              );
            });
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });
      })
      //----- CASE 2: where there ISBN + / + pageNumber DO NOT already exists in storage ------
      .catch((e) => {
        console.log("UHHHHH" + JSON.stringify(e));
        return null;
      });
  };

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
          const ISBN = doc.data().isbn;
          const pageNumber = doc.data().page;
          const questionObj = {
            id: questionID,
            question: question,
            isbn: ISBN,
            page: pageNumber,
          };
          setMyQuestions((oldArray) => [...oldArray, questionObj]);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  const QuestionList = () =>
    pages.map((page, index) => (
      <CardItem
        button
        key={index}
        onPress={() => getPhoto(page)}
        // onPress={() =>
        //   navigation.navigate("Respond", {
        //     route: route,
        //     questionID: myQuestions[index].id,
        //     question: myQuestions[index].question,
        //     ISBN: myQuestions[index].isbn,
        //     pageNumber: myQuestions[index].page,
        //   })
        // }
      >
        <Text>{page}</Text>
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
      <Text style={{ margin: 10 }}>PAGES</Text>
      <QuestionList />
    </View>
  );
}
