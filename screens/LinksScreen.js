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
  console.log(route);
  const db = firebase.firestore();
  //const { loc, photo_uri } = route.params;
  const [annCoords, setAnnCoords] = useState([]);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [image, setImage] = useState("");
  const [ISBN, setISBN] = useState("");
  const [photo, setPhoto] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setAnnCoords([pan.x._value, pan.y._value]);
        // console.log(pan.x._value)
        // console.log(annCoords.toString())
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const uploadQuestion = async () => {
    try {
      await db
        .collection("Questions")
        .doc("TestQuestion123")
        .set({
          title: title,
          question: question,
          author: "Brian",
          isbn: ISBN,
          page: pageNumber,
          loc: [32, 23], // Example!
          status: "open",
        });
    } catch (e) {
      console.error("Error writing document: ", e);
    }
  };

  async function uploadImage(photo_uri) {
    const response = await fetch(photo_uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + "test");
    return ref.put(blob);
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "orange",
      accent: "#f1c40f",
    },
  };
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
          />
        </View>
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
              setPhoto: setPhoto,
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

        <Button
          title="Press Me"
          onPress={() => {
            uploadQuestion();
            // navigation.navigate("PDF");
          }}
        >
          Go to PDF
        </Button>
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
