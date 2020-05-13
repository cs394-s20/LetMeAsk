import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LinksScreen() {
  const [annCoords, setAnnCoords] = useState([]);

  const handleImageClick = (e) => {
    setAnnCoords([e.nativeEvent.locationX, e.nativeEvent.locationY]);
  };

  return (
    <View>
      <View style={styles.photoContainer}>
        <Image
          onTouchStart={(e) => handleImageClick(e)}
          style={styles.photo}
          resizeMode={"contain"}
          source={{
            uri:
              "https://lh3.googleusercontent.com/proxy/gMrsrYWI3BmRkcFfQuRBAJCCr3LkfUaC0lnoxAsXqHQfNykkFKsBx1oH1YHeh9ENU7xKkvRfgXIRJasxt7J603Fx5JboWgIZyQ8j-Hju8xRTr5FVPrdCRH2oF7vsRD_b7gLhtbVeug",
          }}
        />
      </View>
      <View style={styles.pin}>
        <Pin coords={annCoords}></Pin>
      </View>
      {/* <MaterialCommunityIcons
        name="map-marker-question"
        size={24}
        color="black"
      /> */}
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
    width: 400,
    height: 500,
    alignSelf: "center",
    marginTop: 10,
    position: "absolute",
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
