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
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function QuestionAnnotation({ navigation, route }) {
  const { setAnnCoords } = route.params;
  const { setPhotoUri } = route.params;
  const { photo_uri } = route.params;

  // const [annCoords, setAnnCoords] = useState([]);
  // // const [xCoord, setXCoord] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;
  // const photo_uri = this.props.navigation.state.params.photo_uri;
  // console.log("qaaaa     " + photo_uri);
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
  // console.log(pan.x);
  // console.log(pan.y);
  // console.log(photo_uri);
  const Pin = ({ coords }) => {
    return (
      <MaterialCommunityIcons
        name="map-marker-question"
        size={50}
        color="#378BE5"
      />
    );
  };

  return (
    <View>
      <Text style={{ padding: 25, fontSize: 18 }}>
        Drag the Pin to the location on the page to which your question
        corresponds.
      </Text>

      <View style={{ width: deviceWidth, height: deviceHeight, marginTop: 5 }}>
        <Image
          style={styles.photo}
          source={{
            uri: photo_uri,
          }}
        />
        {/* <Text>My photo uri:{photo_uri}</Text> */}
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Pin></Pin>
        </Animated.View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setAnnCoords([pan.x, pan.y]);
            setPhotoUri(photo_uri);
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
            <Text style={{ color: "white", fontSize: 20 }}>Confirm</Text>
          </View>
        </TouchableOpacity>
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
    borderColor: "#378BE5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    marginTop: 20,
    backgroundColor: "white",
    width: deviceWidth * 0.9,
  },
});
