import * as WebBrowser from "expo-web-browser";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  PanResponder,
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

import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

const db = firebase.firestore();
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function Response({ navigation, route }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [answer, setAnswer] = useState("");
  const { questionID } = route.params;
  const { question } = route.params;
  const { ISBN } = route.params;
  const { pageNumber } = route.params;

  const [uri, setURI] = useState("");

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setAnnCoords([pan.x._value, pan.y._value]);
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

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

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
    // resizeMode: "contain",
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
