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
  Animated,
  PanResponder,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../shared/firebase";
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;
const db = firebase.firestore();

export default function ViewAnswer({ navigation, route }) {
  const scale = useRef(new Animated.Value(1)).current;
  const { question } = route.params;
  const { questionID } = route.params;
  const { ISBN } = route.params;
  const { pageNumber } = route.params;

  const [answer, setAnswer] = useState("Answer Pending");
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

  useEffect(() => {
    getAnswer();
  }, []);

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

  const getPhoto = async (id) => {
    let booksRef = db.collection("Books");
    let questionsRef = db.collection("Questions");
    var uri;
    //--------- added logic to handle case where ISBN + / + pageNumber doesn't exist in firebase storage ----------
    const ref2 = firebase.storage().ref(ISBN + "/" + pageNumber);
    console.log("HELLO" + ref2);

    //----- CASE 1: where there ISBN + / + pageNumber already exists in storage ------
    ref2
      .getDownloadURL()
      .then((url) => {
        let query = booksRef
          .where(firebase.firestore.FieldPath.documentId(), "==", ISBN)
          .where("pages", "array-contains", pageNumber)
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
                        console.log("HELLOOOOO" + uri);
                        navigation.setParams({ photo_uri: uri });
                        console.log("=========" + uri);
                        navigation.navigate("Page", {
                          route: route,
                          navigation: navigation,
                          photo_uri: uri,
                          ISBN: ISBN,
                          pageNumber: pageNumber,
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
        <Text style={{ color: "white", lineHeight: 20, fontSize: 15 }}>
          <Text style={{ fontSize: 20 }}>A:</Text>
          {" " + answer}
        </Text>
      </View>

      <Button title="View Page" onPress={getPhoto}></Button>
      {/* <Animated.View
        style={{
          alignItems: "center",
          width: deviceWidth,
          height: deviceHeight,
        }}
      >
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.View
            style={{
              width: deviceWidth,
              height: deviceHeight + 55,
              transform: [{ scale: scale }],
            }}
          >
            <Animated.Image
              style={styles.photo}
              resizeMode="stretch"
              source={{
                uri: uri,
              }}
            />
            <Animated.View
              style={{
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              }}
              {...panResponder.panHandlers}
            ></Animated.View>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View> */}
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
