import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import firebase from "../shared/firebase";

// import uuid from "react-native-uuid";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function LinksScreen({ navigation, route }) {
  const db = firebase.firestore();

  // console.log("CONSOLLEEEINNG", route.params?.x);

  const [annCoords, setAnnCoords] = useState([]);
  const [photouri, setPhotoUri] = useState("");
  const [annotateURI, setAnnotateURI] = useState("");
  console.log(photouri);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [image, setImage] = useState("");
  const [ISBN, setISBN] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;

  const toGoAfterPhotoUpload = async (id) => {
    let booksRef = db.collection("Books");
    let questionsRef = db.collection("Questions");
    var uri;
    const ref2 = firebase.storage().ref(ISBN + "/" + pageNumber);
    // const url = await ref2.getDownloadURL();
    // console.log("+++++++++++++" + url);
    ref2
      .getDownloadURL()
      .then((url) => {
        // console.log("url", url.status);
        // return url;
        let query = booksRef
          .where(firebase.firestore.FieldPath.documentId(), "==", ISBN)
          .where("pages", "array-contains", pageNumber)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              navigation.navigate("Camera", {
                navigation: navigation,
                route: route,
                setAnnCoords: setAnnCoords,
                setPhotoUri: setPhotoUri,
              });
              return;
            }
            snapshot.forEach((doc) => {
              doc.data().questions.forEach((question) =>
                questionsRef
                  .where(
                    firebase.firestore.FieldPath.documentId(),
                    "==",
                    question
                  )
                  .where("page", "==", pageNumber)
                  .get()
                  .then((snapshot) => {
                    if (snapshot.empty) {
                      console.log("SNAPSHOT EMPTY");
                      return;
                    } else {
                      snapshot.forEach((doc) => {
                        console.log(doc.data().image);
                        uri = url;
                      });
                      navigation.setParams({ photo_uri: uri });
                      console.log("=========" + uri);
                      navigation.navigate("Annotate", {
                        route: route,
                        navigation: navigation,
                        photo_uri: uri,
                        setPhotoUri: setPhotoUri,
                        setAnnCoords: setAnnCoords,
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
      .catch((e) => {
        var errorObj = JSON.parse(e.serverResponse);
        console.log("imageError", errorObj.error.code);
        if (errorObj.error.code === 404) {
          navigation.navigate("Camera", {
            navigation: navigation,
            route: route,
            setAnnCoords: setAnnCoords,
            setPhotoUri: setPhotoUri,
          });
        }
        return null;
      });
  };

  const uploadPhoto = async (photouri) => {
    if (!photouri) console.log("No image found");
    try {
      const response = await fetch(photouri);
      const blob = await response.blob();
      var ref = firebase.storage().ref();
      ref
        .child(String(ISBN) + "/" + String(pageNumber))
        .put(blob)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          console.log("+++++++++++___________" + String(snapshot));
        });
      // const ref2 = firebase.storage().ref(ISBN + "/" + pageNumber);
      // const url = await ref2.getDownloadURL();
      // console.log("+++++++++++++" + url);
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  };

  const updateBook = async (id) => {
    try {
      console.log(ISBN);
      let bookRef = db.collection("Books").doc(ISBN);
      bookRef.get().then(async (docSnapshot) => {
        if (docSnapshot.exists) {
          console.log("==================docSnapshot EXISTS!");
          await bookRef.set(
            {
              questions: firebase.firestore.FieldValue.arrayUnion(id),
              pages: firebase.firestore.FieldValue.arrayUnion(pageNumber),
            },
            { merge: true }
          );
        } else {
          let bookInfo = await axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
              ISBN +
              "&key=AIzaSyCw9mT4kgFm5C510t88wNFViZJXxYd9Zp0"
          );

          db.collection("Books")
            .doc(ISBN)
            .set({
              title: bookInfo.data.items[0].volumeInfo.title,
              // subtitle: bookInfo.data.items[0].volumeInfo.subtitle,
              authors: bookInfo.data.items[0].volumeInfo.authors,
              questions: firebase.firestore.FieldValue.arrayUnion(id),
              pages: firebase.firestore.FieldValue.arrayUnion(pageNumber),
            });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const uploadQuestion = async () => {
    try {
      await uploadPhoto(photouri);
      await db
        .collection("Questions")
        .add({
          title: "try",
          question: question,
          answer: '',
          author: "test",
          isbn: ISBN,
          page: pageNumber,
          image: String(ISBN) + "/" + String(pageNumber),
          loc: coords,
          status: "open",
        })
        .then((docref) => updateBook(docref.id));
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#378BE5",
      accent: "#f1c40f",
    },
  };

  const coords = annCoords.map((obj) => {
    return Object.assign({}, obj)._value;
  });

  console.log(coords);

  return (
    <View>
      <View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            label="Question"
            style={styles.submitInput}
            onChangeText={(text) => setQuestion(text)}
            value={question}
            placeholder=""
            underlineColor="#378BE5"
            selectionColor="#378BE5"
            theme={theme}
          />
          <TextInput
            label="ISBN"
            style={styles.submitInput}
            onChangeText={(text) => setISBN(text)}
            value={ISBN}
            placeholder=""
            underlineColor="#378BE5"
            selectionColor="#378BE5"
            theme={theme}
          />
          <TextInput
            label="Page Number"
            style={styles.submitInput}
            onChangeText={(text) => setPageNumber(text)}
            value={pageNumber}
            placeholder=""
            underlineColor="#378BE5"
            selectionColor="#378BE5"
            theme={theme}
            // keyboardType={"numeric"}
          />
        </View>
        {annCoords.length === 0 && (
          <TouchableOpacity
            style={{
              // borderColor: "red",
              // borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginLeft: 21,
              width: "27%",
              borderColor: "#378BE5",
              borderWidth: 2,
              borderStyle: "dashed",
            }}
            onPress={() => toGoAfterPhotoUpload()}
            title="Upload Photo of Page"
            accessibilityLabel="Take Photo of Page"
          >
            <View
              style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="camera-plus"
                size={50}
                color="#378BE5"
              />
              <Text style={{ fontSize: 12, marginTop: 5, color: "#378BE5" }}>
                Add Photo
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {photouri.length !== 0 && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                width: deviceWidth * 0.55,
                height: deviceHeight * 0.7,
                borderRadius: 5,
                // marginLeft: 90,
              }}
              source={{ uri: photouri }}
            ></Image>
          </View>
        )}

        {/* {annCoords.length !== 0 && (
          <View style={{ margin: 10, borderWidth: 0.5 }}>
            <Text>Points: {JSON.stringify(annCoords)}</Text>
          </View>
        )} */}

        {annCoords.length !== 0 && photouri.length !== 0 && (
          <View
            style={{
              marginTop: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#378BE5",
                alignItems: "center",
                justifyContent: "center",

                height: 60,
                width: "50%",
                borderRadius: 7,
                marginTop: 25,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              title="Submit Question"
              accessibilityLabel="Submit Question"
              onPress={() => {
                uploadQuestion();
                navigation.navigate("Submitted", {
                  route: route,
                  question: question,
                });
              }}
            >
              <View>
                <Text style={{ color: "white", fontSize: 20 }}>
                  Submit Question
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const Pin = ({ coords }) => {
  return (
    <MaterialCommunityIcons
      name="map-marker-question"
      size={50}
      color="#378BE5"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  photo: {
    width: undefined,
    height: undefined,
    alignSelf: "center",
    resizeMode: "contain",
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    top: 100,
    bottom: 0,
    left: 70,
    right: 0,
  },
  submitInput: {
    height: 56,
    fontSize: 18,
    borderColor: "#378BE5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    marginTop: 20,
    backgroundColor: "white",
    width: deviceWidth * 0.9,
  },
});
