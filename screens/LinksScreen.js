import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  // TextInput,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
// import { RectButton, ScrollView } from "react-native-gesture-handler";
import CameraApp from "../components/Camera";
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function LinksScreen() {
  const [annCoords, setAnnCoords] = useState([]);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [image, setImage] = useState("");
  const [ISBN, setISBN] = useState("");
  const [photo, setPhoto] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  async function uploadImage(photo) {
    const response = await fetch(photo);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + "test");
    return ref.put(blob);
  }

  if (cameraOpen) {
    return <CameraApp setPhoto={setPhoto} setCameraOpen={setCameraOpen} />;
  }

  const ShowAlertWithDelay = () => {
    setTimeout(function () {
      Alert.alert("An expert has answered your question!");
    }, 2000);
  };

  if (submitted) {
    ShowAlertWithDelay();
    return (
      <View>
        <Text style={{ padding: 10 }}>
          Your question has been submitted! Our experts will be in contact with
          you soon!
        </Text>
      </View>
    );
  }

  if (photo) {
    return (
      <View>
        <Text style={{ padding: 10, fontSize: 18 }}>
          Drag the Pin to the location on the page to which your question
          corresponds.
        </Text>

        <View style={{ width: deviceWidth, height: deviceHeight }}>
          <Image
            // onTouchStart={(e) => handleImageClick(e)}
            style={styles.photo}
            // resizeMode={"contain"}
            source={{
              uri: photo,
            }}
          />
          <Animated.View
            style={{
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            }}
            {...panResponder.panHandlers}
          >
            <Pin coords={annCoords}></Pin>
          </Animated.View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setSubmitted(true);
            }}
            title="Submit Question"
            accessibilityLabel="Submit Your Question"
            style={{
              backgroundColor: "orange",
              alignItems: "center",
              justifyContent: "center",
              height: 60,
              width: "50%",
              borderRadius: 7,
              marginTop: 15,
            }}
          >
            <View style={{}}>
              <Text style={{ color: "white", fontSize: 20 }}>
                Submit Question
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
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
          onPress={() => setCameraOpen(true)}
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
  // photoContainer: {
  //   position: "absolute",
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   borderColor: "red",
  //   borderWidth: 2,
  //   // borderTopWidth: 5,
  // },
  pin: {
    top: 10,
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
