import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  Button,
} from "react-native";
// import { RectButton, ScrollView } from "react-native-gesture-handler";
import CameraApp from '../components/Camera'

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LinksScreen() {
  const [annCoords, setAnnCoords] = useState([]);

  const [cameraOpen, setCameraOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [image, setImage] = useState('')
  const [ISBN, setISBN] = useState('');
  const [photo, setPhoto] = useState('');


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
  const deviceHeight = Dimensions.get("window").height * 0.5;

  async function uploadImage(photo) {
    const response = await fetch(photo);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + "test");
    return ref.put(blob);
  };

  const Preview = () => {
    if (photo) {
      return(
      <Image
          // onTouchStart={(e) => handleImageClick(e)}
          style={styles.photo}
          // resizeMode={"contain"}
          source={{
            uri: photo
          }}
      />
      )
    }
    return ( <Text>Photo not here</Text>)
   
  }
    


  if (cameraOpen) {
    return <CameraApp setPhoto={setPhoto} setCameraOpen={setCameraOpen}></CameraApp>
  }

  return (
    <View>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'lightblue', borderWidth: 1 }}
          onChangeText={text => setQuestion(text)}
          value={question}
          placeholder="Question"
        />
        <TextInput
          style={{ height: 40, borderColor: 'lightblue', borderWidth: 1 }}
          onChangeText={text => setISBN(text)}
          value={ISBN}
          placeholder="ISBN"
        />
         <TextInput
          style={{ height: 40, borderColor: 'lightblue', borderWidth: 1 }}
          onChangeText={text => setPageNumber(text)}
          value={pageNumber}
          placeholder="Page Number"
        />
        <Button
          onPress={() => setCameraOpen(true)}
          title="Upload Photo of Page"
          accessibilityLabel="Take Photo of Page"
        />
      </View>
      <Text>Drag the Pin to the location on the page to which your question corresponds.</Text>
      <View
        style={{
          // borderColor: "red",
          // borderWidth: 2,
          width: deviceWidth,
          height: deviceHeight,
        }}
      >
        <Preview></Preview>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Pin coords={annCoords}></Pin>
        </Animated.View>
      </View>
      <Button 
          onPress={() => submit()}
          title="Submit Question"
          accessibilityLabel="Submit Your Question"
        />
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
