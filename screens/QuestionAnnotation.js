import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  ScrollView,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";

import Modal from "react-native-modal";
import Onboarding from "react-native-onboarding-swiper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";
import firebase from "../shared/firebase";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;
const db = firebase.firestore();

export default function QuestionAnnotation({ navigation, route }) {
  const { setAnnCoords } = route.params;
  const { setPhotoUri } = route.params;
  const { photo_uri } = route.params;
  const { ISBN } = route.params;
  const { pageNumber } = route.params;
  const [isZoom, setIsZoom] = useState(false);
  const [prevQuestions, setPrevQuestions] = useState({});
  const viewShotRef = useRef(null);
  const [myQuestion, setMyQuestion] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [viewInstruct, setViewInstruct] = useState(false);
  const [pinColor, setPinColor] = useState("#378BE5");

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const showQuestion = async (pageX, pageY) => {
    let questionsRef = db.collection("Questions");
    let query = questionsRef
      .where("isbn", "==", ISBN)
      .where("page", "==", pageNumber)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach((doc) => {
          if (
            Math.abs(pageX - doc.data().loc[0]) >= 6 &&
            Math.abs(pageX - doc.data().loc[0]) <= 39 &&
            Math.abs(pageY - doc.data().loc[1]) >= 180 &&
            Math.abs(pageY - doc.data().loc[1]) <= 230
          ) {
            setMyQuestion(doc.data().question);
            setModalVisible(true);
            // console.log("X diff " + pageX - doc.data().loc[0]);
            // console.log("Y diff " + pageY - doc.data().loc[1]);

            console.log(doc.data().question);
            // console.log("pageY " + pageY);
            // console.log("panY " + doc.data().loc[1]);
            // console.log("pageX " + pageX);
            // console.log("panX " + doc.data().loc[0]);
          } else {
            // console.log("OHHHHHH NOOOOOOOOOOO");
          }
        });
        // console.log(panX, panY);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

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
  const onTranslateXEvent = Animated.event(
    [
      {
        nativeEvent: { translationX: translateX },
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

  const onTranslateXStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

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

  const OnboardingExp = () => {
    return (
      <Onboarding
        showSkip={false}
        onDone={() => setViewInstruct(false)}
        pages={[
          {
            backgroundColor: "#2196F3",
            image: (
              <MaterialCommunityIcons
                name="map-marker-question"
                size={150}
                color={"#e57359"}
              />
            ),
            title: "View Questions",

            subtitle:
              "Click on any red-colored question mark to view questions asked by other users",
          },
          {
            backgroundColor: "#e57359",
            image: (
              <MaterialCommunityIcons
                name="map-marker-question"
                size={150}
                color={"#2196F3"}
              />
            ),
            title: "Ask a Question",
            subtitle:
              "If you have a question that others haven't asked, drag the blue question mark to the place on the image that corresponds to your question",
          },
          {
            backgroundColor: "#fff",
            image: (
              <MaterialCommunityIcons
                name="gesture-tap"
                size={150}
                color={"#111"}
              />
            ),
            title: "Before you submit...",
            subtitle:
              "Once you place your question mark, tap it to make sure it turns red ",
          },
        ]}
      />
    );
  };

  const QuestionModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20 }}>QUESTION:</Text>
            <Text style={styles.modalText}>{myQuestion}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>View Answer</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  };

  const InstructionsModal = () => {
    return (
      <Modal
        isVisible={viewInstruct}
        onBackdropPress={() => setViewInstruct(!viewInstruct)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20 }}>INSTRUCTIONS:</Text>
            <Text style={styles.modalText}>These are the instructions</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setViewInstruct(!viewInstruct);
              }}
            >
              <Text style={styles.textStyle}>OK!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  };

  const returnQuestionsOnPage = async () => {
    let questionsArray = {};
    let questionsRef = db.collection("Questions");
    let query = questionsRef
      .where("isbn", "==", ISBN)
      .where("page", "==", pageNumber)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          console.log(doc);
          questionsArray[doc.id] = doc.data();
        });
        console.log(questionsArray);
        console.log("--------------------------------------");
        setPrevQuestions(questionsArray);
        console.log(
          "-----------!!!!!!!!!!!!!!!!!!!---------------------------"
        );
        console.log(prevQuestions);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  if (viewInstruct) {
    return <OnboardingExp />;
  }

  return (
    <View
      onTouchStart={(e) => {
        showQuestion(e.nativeEvent.pageX, e.nativeEvent.pageY);
      }}
    >
      <TouchableOpacity
        title="How to annotate a photo?"
        onPress={() => setViewInstruct(true)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 25,
          }}
        >
          <MaterialCommunityIcons
            name="information"
            size={24}
            color="#2196F3"
          />
          <Text style={{ marginLeft: 5, fontSize: 24 }}>
            How to annotate a photo?
          </Text>
        </View>
      </TouchableOpacity>

      <ViewShot
        style={{
          width: deviceWidth,
          height: deviceHeight + 55,
        }}
        ref={viewShotRef}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <Animated.View
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
                  uri: photo_uri,
                }}
              />
              <Animated.View
                style={{
                  transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...panResponder.panHandlers}
              >
                <TouchableWithoutFeedback
                  onPressIn={() => setPinColor("#378BE5")}
                  onPress={() => setPinColor("#e57359")}
                >
                  <MaterialCommunityIcons
                    name="map-marker-question"
                    size={50}
                    color={pinColor}
                  />
                </TouchableWithoutFeedback>
              </Animated.View>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </ViewShot>

      <QuestionModal />

      {/* <InstructionsModal /> */}

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={async () => {
            setAnnCoords([pan.x, pan.y]);
            const uri = await viewShotRef.current.capture();
            setPhotoUri(uri);

            navigation.setParams({ xy: [pan.x, pan.y] });
            navigation.navigate("Root", {
              route: route,
              navigation: navigation,
              xy: [pan.x, pan.y],
            });
          }}
          title="Submit Question"
          accessibilityLabel="Submit Question"
          style={{
            backgroundColor: "#378BE5",
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: "50%",
            borderRadius: 30,
            marginTop: 30,
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
            <Text style={{ color: "white", fontSize: 20 }}>Ask a Question</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "left", justifyContent: "center" }}>
        <View style={{ alignItems: "left", justifyContent: "center" }}>
          {Object.keys(prevQuestions).map((key, index) => (
            <View>
              <Text
                style={{ paddingLeft: 30, paddingBottom: 10, fontSize: 18 }}
              >
                {prevQuestions[key].question}
              </Text>
              <Text
                style={{ paddingLeft: 30, paddingBottom: 25, fontSize: 18 }}
              >
                This is the answer to this question
              </Text>
            </View>
          ))}
        </View>
      </View>
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
