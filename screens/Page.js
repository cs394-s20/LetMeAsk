import React, { useState, useEffect, useRef, useContext } from "react";
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
import { UserContext } from "../components/UserContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import firebase from "../shared/firebase";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;
const db = firebase.firestore();

export default function Page({ navigation, route }) {
  const { photo_uri, ISBN, pageNumber } = route.params;
  const [myQuestion, setMyQuestion] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pinColor, setPinColor] = useState("#378BE5");
  const [answer, setAnswer] = useState("Pending Answer");
  const [seeAnswer, setSeeAnswer] = useState(false);
  const [questionID, setQuestionID] = useState("");
  const [myUser, setMyUser] = useContext(UserContext);

  console.log(pageNumber);
  console.log(ISBN);
  //   console.log("DISPLAY NAME" + myUser.displayName);
  const typeOfUser = myUser.displayName;

  const scale = useRef(new Animated.Value(1)).current;

  const showAnswer = async () => {
    let questionRef = db.collection("Questions");
    let query = questionRef
      .where(firebase.firestore.FieldPath.documentId(), "==", questionID)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach((doc) => {
          if (doc.data().answer === "") {
            setAnswer("Pending Answer");
          } else {
            const answer = doc.data().answer;
            console.log(answer);
            setAnswer(answer);
          }
        });
      });
  };

  const showQuestion = async (pageX, pageY) => {
    let questionsRef = db.collection("Questions");
    if (ISBN && pageNumber) {
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
              setQuestionID(doc.id);
            } else {
              console.log("OHHHHHH NOOOOOOOOOOO");
            }
          });
        })

        .catch((err) => {
          console.log("Error getting documents", err);
        });
    } else {
      return;
    }
    // console.log("QUESTION ID QUESTION ID QUESTION ID: " + questionID);
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

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
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

  const QuestionModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
          setSeeAnswer(false);
        }}
      >
        <View style={styles.centeredView}>
          {seeAnswer == false && (
            <View style={styles.modalView}>
              <Text style={{ fontSize: 20 }}>QUESTION:</Text>
              <Text style={styles.modalText}>{myQuestion}</Text>
              {typeOfUser === "Student" && (
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={styles.textStyle}
                    onPress={() => {
                      setSeeAnswer(true);
                      showAnswer();
                    }}
                  >
                    View Answer
                  </Text>
                </TouchableHighlight>
              )}
              {typeOfUser === "Expert" && (
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#e57359" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={styles.textStyle}
                    onPress={() => {
                      navigation.navigate("Respond", {
                        navigation: navigation,
                        route: route,
                        question: myQuestion,
                        questionID: questionID,
                      });

                      setModalVisible(false);
                      //   showAnswer();
                    }}
                  >
                    Answer this!
                  </Text>
                </TouchableHighlight>
              )}
            </View>
          )}
          {seeAnswer == true && (
            <View style={styles.modalView}>
              <Text style={{ fontSize: 20 }}>ANSWER:</Text>
              <Text style={styles.modalText}>{answer}</Text>
            </View>
          )}
        </View>
      </Modal>
    );
  };

  return (
    <View
      onTouchStart={(e) => {
        if (modalVisible === false) {
          showQuestion(e.nativeEvent.pageX, e.nativeEvent.pageY);
        } else {
          console.log("MODAL IS VISIBLE");
          return;
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 25,
        }}
      >
        <MaterialCommunityIcons name="information" size={24} color="#2196F3" />
        <Text style={{ marginLeft: 5, fontSize: 24 }}>
          Tap on question marks to view the questions asked on this page
        </Text>
      </View>

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
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>

      <QuestionModal />
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
