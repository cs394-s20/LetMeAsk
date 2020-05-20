import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';


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
        <Card style={styles.answeredQ}>
          <Card.Content>
            <Title>Do jellyfish sleep?</Title>
            <Paragraph>If so, how do they sleep?</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.answeredQ}>
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
        <Card style={styles.unansweredQ}>
          <Card.Content>
            <Title>Do jellyfish sleep?</Title>
            <Paragraph>If so, how do they sleep?</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.unansweredQ}>
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


const styles = StyleSheet.create({
  answeredQ: {
    height: '50%',
    backgroundColor: '#3686E4',
    margin: 10
  },
  unansweredQ: {
    height: '50%',
    backgroundColor: '#E14321',
    margin: 10
  },
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
});
