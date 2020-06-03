import React, { useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OnBoarding({ navigation, route }) {
  return (
    <Onboarding
      showSkip={false}
      onDone={() => navigation.navigate("Annotate")}
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
}
