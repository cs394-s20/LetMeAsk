import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LinksScreen() {
  const [annCoords, setAnnCoords] = useState([]);

  const handleImageClick = (e) => {
    setAnnCoords([e.nativeEvent.locationX, e.nativeEvent.locationY])
  }

  return (
    <View>
      <View>

        <Image
          onTouchStart={(e) => handleImageClick(e)}
          style={styles.photo}
          source={{
            uri: 'https://lh3.googleusercontent.com/proxy/iiaiDZ6QBxQKEWYIzams9m8Yq72zn6R5DlAIs2IXYSu37_UsvtHc4b-mz1KSdzWuJwj5OIlHfw0xEZxonz4CKvhAeFZ_URQ-JV5ezbfLE8SHslFy1_5OoIYXhdpm0DHz9MsX1LnTtQ',
          }}
        />
        {/* <Pin coords={annCoords}></Pin> */}
      </View >
      <MaterialCommunityIcons name="map-marker-question" size={24} color="black" />
      <View><Pin coords={annCoords}></Pin></View>
    </View>

  );
}

const Pin = ({ coords }) => {
  return (
    <View>
      <MaterialCommunityIcons name="map-marker-question" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  photo: {
    width: 200,
    height: 300,
    alignSelf: 'center',
    marginTop: 10
  }
});
