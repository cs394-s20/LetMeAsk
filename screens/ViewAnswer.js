import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function ViewAnswer() {
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
          <Text style={{ fontSize: 20 }}>Q:</Text> Can someone explain what make
          up the flagella and what is its connection to microtubules?
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
          <Text style={{ fontSize: 20 }}>A:</Text> In eukaryotic cells, flagella
          contain the motor protein dynein and microtubules, which are composed
          of linear polymers of globular proteins called tubulin. The core of
          each of the structures is termed the axoneme and contains two central
          microtubules that are surrounded by an outer ring of nine doublet
          microtubules. One full microtubule and one partial microtubule, the
          latter of which shares a tubule wall with the other microtubule,
          comprise each doublet microtubule {"\n"}
          {"\n"}
          <Text>Responded by Christopher Deal</Text>
        </Text>
      </View>
    </View>
  );
}
