import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LinksScreen() {
  const [annCoords, setAnnCoords] = useState([]);

  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [image, setImage] = useState('')
  const [ISBN, setISBN] = useState('');

  /*
  Question Model
    _id: String,
    title: String,
    description: String,
    subject: String,
    author: String,
    image: String,
    isbn: String,
    position: {
      page
      coordinates
    }
  })

  User Model {
    _id: String,
    email: String,
    credentials: {
      school: String,
      AuthorFor: [] Subjects,
      expertIn: [] Subjects,
      ModeratorFor: [] Subjects,
    },
    questions: [] Question_id's
  }

  Book Model {
   _id: String,
    title: String,
    author: String,
    isbn: String,
    questions: [] QuestionId's
  }
*/

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setAnnCoords([pan.x._value, pan.y._value])
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

  // const handleImageClick = (e) => {
  //   setAnnCoords([e.nativeEvent.locationX, e.nativeEvent.locationY]);
  // };

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height * 0.809;

  return (
    <View>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'lightblue', borderWidth: 1 }}
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={{ height: 40, borderColor: 'lightblue', borderWidth: 1 }}
          onChangeText={text => setQuestion(text)}
          value={question}
          placeholder="Question"
        />
      </View>
      <View
        style={{
          // borderColor: "red",
          // borderWidth: 2,
          width: deviceWidth,
          height: deviceHeight,
        }}
      >
        <Text>Drag the Pin to the location on the page to which your question corresponds.</Text>
        <Image
          // onTouchStart={(e) => handleImageClick(e)}
          style={styles.photo}
          // resizeMode={"contain"}
          source={{
            uri:
              "https://sputniktextbook.org/Pictures/About/TextBook/Page_118sm.jpg",
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
    </View>
  );
}

const Pin = ({ coords }) => {
  return (
    <MaterialCommunityIcons
      name="map-marker-question"
      size={24}
      color="black"
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
    borderColor: "red",
    borderWidth: 2,
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
});
