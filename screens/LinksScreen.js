import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
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
  console.log("CONSOLLEEEINNG", route.params?.x);

  // useEffect(() => {
  //   if (route.params?.x) {
  //     console.log("x yay");
  //   }
  //   else {
  //     console.log("this sucks");
  //   }
  // }, [route.params?.x]);

  const [annCoords, setAnnCoords] = useState([]);
  const [photouri, setPhotoUri] = useState([]);
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

  // const [xCoord, setXCoord] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const uploadQuestion = async () => {
    try {
      await db
        .collection("Questions")
        .add({
          title: "try",
          question: question,
          author: "test",
          isbn: ISBN,
          page: pageNumber,
          image: photouri,
          loc: coords, // Example!
          status: "open",
        })
        .then(() => {
          console.log("question added!");
        });
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "orange",
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
            underlineColor="orange"
            selectionColor="orange"
            theme={theme}
          />
          <TextInput
            label="ISBN"
            style={styles.submitInput}
            onChangeText={(text) => setISBN(text)}
            value={ISBN}
            placeholder=""
            underlineColor="orange"
            selectionColor="orange"
            theme={theme}
          />
          <TextInput
            label="Page Number"
            style={styles.submitInput}
            onChangeText={(text) => setPageNumber(text)}
            value={pageNumber}
            placeholder=""
            underlineColor="orange"
            selectionColor="orange"
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
              borderColor: "orange",
              borderWidth: 2,
              borderStyle: "dashed",
            }}
            onPress={() =>
              navigation.navigate("Camera", {
                navigation: navigation,
                route: route,
                setAnnCoords: setAnnCoords,
                setPhotoUri: setPhotoUri,
              })
            }
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
                color="orange"
              />
              <Text style={{ fontSize: 12, marginTop: 5, color: "orange" }}>
                Add Photo
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {photouri.length !== 0 && (
          <ScrollView>
            <Image
              style={{
                marginTop: 10,
                width: 200,
                height: 300,
                borderRadius: 20,
                marginLeft: 90,
              }}
              source={{ uri: photouri }}
            ></Image>
          </ScrollView>
        )}

        {annCoords.length !== 0 && (
          <View style={{ margin: 10, borderWidth: 0.5 }}>
            <Text>Points: {JSON.stringify(annCoords)}</Text>
          </View>
        )}

        {annCoords.length !== 0 && photouri.length !== 0 && (
          <Button
            title="Submit Question"
            onPress={() => {
              console.log("uploaded question pressed");
              console.log(annCoords);
              console.log("hahaha   " + photouri);

              uploadQuestion();
              navigation.navigate("Submitted", {
                route: route,
                question: question,
              });
              // navigation.navigate("PDF");
            }}
          ></Button>
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
      color="orange"
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
    // marginTop: 10,
    // position: "absolute",
    // borderColor: "red",
    // borderWidth: 2,
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
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    marginTop: 20,
    backgroundColor: "white",
    width: deviceWidth * 0.9,
  },
});
