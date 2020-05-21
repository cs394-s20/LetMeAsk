import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfReader = ({ url: uri }) => <WebView style={{ flex: 1 }} source={{ uri }} />

export default function PDF() {
  return (
    <View style={styles.container}>
      <PdfReader url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
