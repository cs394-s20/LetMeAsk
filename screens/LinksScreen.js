import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
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

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
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

  const handleImageClick = (e) => {
    setAnnCoords([e.nativeEvent.locationX, e.nativeEvent.locationY]);
    console.log(e);
  };
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height * 0.809;

  return (
    <View
      style={{
        borderColor: "red",
        borderWidth: 2,
        width: deviceWidth,
        height: deviceHeight,
      }}
    >
      <Image
        onTouchStart={(e) => handleImageClick(e)}
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
