import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Modal, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
// import firebase from "firebase";
import firebase from "../shared/firebase";
//Expo Icon
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

//setPhoto, setCameraOpen
export default function CameraApp({ navigation, route }) {
  const { setXCoord } = route.params;
  const { setAnnCoords } = route.params;
  const { setPhotoUri } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  //camera photo
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  //open the image dialog after taking a photo
  const [open, setOpen] = useState(false);
  //open the image dialog after choosing from album
  const [imageOpen, setImageOpen] = useState(false);
  //album photo
  const [pickPhoto, setPickPhoto] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      getPermissionAsync();
    })();
  }, []);

  async function getPermissionAsync() {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasPermission(status === "granted");
  }

  async function takePicture() {
    if (camRef) {
      let photo = await camRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
      setOpen(true);
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log(result.uri);
    setPickPhoto(result.uri);
    setImageOpen(true);
  }

  async function uploadImage(uri) {
    setPhoto(uri);
    // console.log("before setopen    " + uri);
    setOpen(false);
    setImageOpen(false);
    // console.log("after setopen      " + uri);
    navigation.setParams({ photo_uri: uri });
    navigation.navigate("Annotate", {
      route: route,
      navigation: navigation,
      photo_uri: uri,
      setPhotoUri: setPhotoUri,
      setAnnCoords: setAnnCoords,
    });
    // navigation.navigate("Annotate", { navigation: navigation });
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={pickImage}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            {pickPhoto && (
              <Modal
                animationType="slide"
                transparent={false}
                visible={imageOpen}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => {
                      setImageOpen(false);
                    }}
                  >
                    <FontAwesome
                      name="window-close"
                      style={{ color: "#ff0000", fontSize: 40 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => {
                      // navigation.navigate("AnnotateQuestion");

                      uploadImage(pickPhoto)
                        .then(() => {
                          console.log("pickPhoto Uploaded");
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <FontAwesome
                      name="arrow-up"
                      style={{ color: "#1ec929", fontSize: 40 }}
                    />
                  </TouchableOpacity>
                  <Image
                    style={{ width: "100%", height: 500, borderRadius: 20 }}
                    source={{ uri: pickPhoto }}
                  ></Image>
                </View>
              </Modal>
            )}

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={takePicture}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            {capturedPhoto && (
              <Modal animationType="slide" transparent={false} visible={open}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => setOpen(false)}
                  >
                    <FontAwesome
                      name="window-close"
                      style={{ color: "#ff0000", fontSize: 40 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => {
                      uploadImage(capturedPhoto)
                        .then(() => {
                          console.log("Photo Uploaded");
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <FontAwesome
                      name="arrow-up"
                      style={{ color: "#1ec929", fontSize: 40 }}
                    />
                  </TouchableOpacity>

                  <Image
                    style={{ width: "100%", height: 500, borderRadius: 20 }}
                    source={{ uri: capturedPhoto }}
                  ></Image>
                </View>
              </Modal>
            )}

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
                onPress={() => {
                  console.log("Flip camera");
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}
