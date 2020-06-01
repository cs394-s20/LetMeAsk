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
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationActions, StackActions } from "react-navigation";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function QuestionSubmitted({ navigation, route }) {
  const { question } = route.params;
  console.log(question);
  const ShowAlertWithDelay = () => {
    setTimeout(function () {
      Alert.alert(
        "An expert has answered your question!",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "View",
            onPress: () =>
              navigation.navigate("Answer", {
                navigation: navigation,
                route: route,
                question: question,
              }),
          },
        ],
        { cancelable: false }
      );
    }, 2000);
  };

  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Answer" })],
  });

  ShowAlertWithDelay();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "#378BE5",
          width: "55%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
          padding: 5,
          borderRadius: 8,
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
        <Text
          style={{
            padding: 10,
            fontSize: 20,
            color: "white",
          }}
        >
          Your question has been submitted! Our experts will be in contact with
          you soon!
        </Text>
      </View>
      <MaterialCommunityIcons
        name="check-circle"
        size={100}
        color="#00B300"
        style={{ marginTop: 20 }}
      />
      <View>
        <TouchableOpacity
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
          title="Go Home"
          accessibilityLabel="Go Home"
          onPress={() => {
            // navigation.navigate("Home", {
            //   route: route,
            // });
            navigation.dispatch(resetAction);
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>Go Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
