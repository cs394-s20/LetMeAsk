import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

import { MonoText } from '../components/StyledText';
import { Camera } from 'expo-camera';



export default function HomeScreen() {
  const [search, onChangeSearch] = useState('')

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1,  }}
            onChangeText={text => onChangeSearch(text)}
            value={search}
            placeholder="Search for Questions"
          />
      </ScrollView>
      <View>
        <Text>Answered Questions</Text>
      </View>
      
      <ScrollView horizontal={true} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
        <Card style={{ height: '50%', backgroundColor: '#3686E4', margin:10 }}>
          <Card.Content>
            <Title>Do jellyfish sleep?</Title>
            <Paragraph>If so, how do they sleep?</Paragraph>
          </Card.Content>
        </Card>
        <Card style={{ height: '50%', backgroundColor: '#3686E4', margin: 10 }}>
          <Card.Content>
            <Title>Do jellyfish sleep?</Title>
            <Paragraph>If so, how do they sleep?</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      <View>
        <Text>Unanswered Questions</Text>
      </View>
      <ScrollView
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={200}
        snapToAlignment={"center"}
        >
        <Card style={{ height: '50%', backgroundColor: '#E14321', margin: 10 }}>
          <Card.Content>
            <Title>Do jellyfish sleep?</Title>
            <Paragraph>If so, how do they sleep?</Paragraph>
          </Card.Content>
        </Card>
        <Card style={{ height: '50%', backgroundColor: '#E14321', margin: 10 }}>
          <Card.Content>
            <Title>Do jellyfish sleep?</Title>
            <Paragraph>If so, how do they sleep?</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
