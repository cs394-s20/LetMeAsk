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
  BackHandler,
} from "react-native";
// import { RectButton, ScrollView } from "react-native-gesture-handler";
import CameraApp from "./Camera";
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function LinksScreen({ navigation }) {
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

  async function uploadImage(photo_uri) {
    const response = await fetch(photo_uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + "test");
    return ref.put(blob);
  }

  //if (cameraOpen) {
  //  return <CameraApp setPhoto={setPhoto} setCameraOpen={setCameraOpen} />;
  //}

  const ShowAlertWithDelay = () => {
    setTimeout(function () {
      Alert.alert(
        "An expert has answered your question!",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "View", onPress: () => setViewAnswer(true) },
        ],
        { cancelable: false }
      );
    }, 2000);
  };

  if (viewAnswer) {
    return (
      <View
        style={{ padding: 10, alignItems: "center", justifyContent: "center" }}
      >
        <View
          style={{
            borderRadius: 5,
            backgroundColor: "orange",
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
          <Text style={{ lineHeight: 20, fontSize: 15 }}>
            <Text style={{ fontSize: 20 }}>Q:</Text> Can someone explain what
            make up the flagella and what is its connection to microtubules?
          </Text>
        </View>
        <View
          style={{
            borderRadius: 5,
            backgroundColor: "#6767FF",
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
          <Text style={{ color: "white", lineHeight: 20, fontSize: 15 }}>
            <Text style={{ fontSize: 20 }}>A:</Text> In eukaryotic cells,
            flagella contain the motor protein dynein and microtubules, which
            are composed of linear polymers of globular proteins called tubulin.
            The core of each of the structures is termed the axoneme and
            contains two central microtubules that are surrounded by an outer
            ring of nine doublet microtubules. One full microtubule and one
            partial microtubule, the latter of which shares a tubule wall with
            the other microtubule, comprise each doublet microtubule {"\n"}
            {"\n"}
            <Text>Responded by Christopher Deal</Text>
          </Text>
        </View>
      </View>
    );
  }

  if (submitted) {
    ShowAlertWithDelay();
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: "orange",
            width: "55%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
            padding: 5,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              color: "white",
            }}
          >
            Your question has been submitted! Our experts will be in contact
            with you soon!
          </Text>
        </View>
        <MaterialCommunityIcons
          name="check-circle"
          size={100}
          color="#00B300"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  if (photo_uri) {
    console.log('photo is here');
    return (
      <View>
        <Text style={{ padding: 25, fontSize: 18 }}>
          Drag the Pin to the location on the page to which your question
          corresponds.
        </Text>

        <View
          style={{ width: deviceWidth, height: deviceHeight, marginTop: 5 }}
        >
          <Image
            // onTouchStart={(e) => handleImageClick(e)}
            style={styles.photo}
            // resizeMode={"contain"}
            source={{
              uri: photo_uri,
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
          onPress={() => navigation.navigate("CameraApp", {navigation: navigation})}
          //</View>navigation.navigate("CameraApp")}

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
