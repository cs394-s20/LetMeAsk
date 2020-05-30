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
  SafeAreaView,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height * 0.5;

export default function QuestionAnnotation({ navigation, route }) {
  const { setAnnCoords } = route.params;
  const { setPhotoUri } = route.params;
  const { photo_uri } = route.params;
  const [isZoom, setIsZoom] = useState(false);
  const viewShotRef = useRef(null);
  // const [uri, setURI] = useState("");

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const screen = Dimensions.get("window");

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

  const Pin = ({ coords }) => {
    return (
      <MaterialCommunityIcons
        name="map-marker-question"
        size={50}
        color="#378BE5"
      />
    );
  };

  console.log(pan.x);
  console.log(pan.y);

  const handleResetZoomScale = (e) => {
    scrollResponserRef.scrollResponderZoomTo({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      animated: true,
    });
  };

  const setZoomRef = (node) => {
    if (node) {
      const zoomRef = node;
      scrollResponderRef = zoomRef.getScrollResponder();
    }
  };

  return (
    <View>
      <Text style={{ padding: 25, fontSize: 18 }}>
        Drag the Pin to the location on the page to which your question
        corresponds.
      </Text>
      <ViewShot
        // style={{ width: deviceWidth, height: deviceHeight, marginTop: 5 }}
        ref={viewShotRef}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <ScrollView
          maximumZoomScale={2}
          scrollEnabled={true}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onTouchStart={(e) => {
            console.log("touchMove", e.nativeEvent);
          }}
        >
          <View
            style={{
              // borderWidth: 2,
              // borderColor: "black",
              width: deviceWidth,
              height: deviceHeight,
              marginTop: 5,
            }}
          >
            <Image
              style={styles.photo}
              resizeMode="contain"
              source={{
                uri: photo_uri,
              }}
            />
          </View>
        </ScrollView>
        <Animated.View
          style={{
            // borderWidth: 2,
            // borderColor: "black",
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Pin></Pin>
        </Animated.View>
      </ViewShot>
      {/* <PanGestureHandler
          onGestureEvent={onTranslateXEvent}
          onHandlerStateChange={onTranslateXStateChange}
        >
          <Animated.View
            style={{ width: deviceWidth, height: deviceHeight, marginTop: 5 }}
          >
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.Image
                style={[
                  styles.photo,
                  { transform: [{ scale: scale }, { translateX: translateX }] },
                ]}
                resizeMode="contain"
                source={{
                  uri: photo_uri,
                }}
              />
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler> */}

      {/* <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pin></Pin>
      </Animated.View> */}

      {/* </PanGestureHandler> */}

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
      {/* <Image
        style={{ marginLeft: 90, height: 125, width: 125 }}
        source={{ uri: photo_uri }}
      ></Image> */}
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
