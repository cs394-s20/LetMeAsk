import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

//Expo Icon
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const textbooks = [
  {
    title: 'Introduction to Algorithms',
    author: 'Goldwater',
    image: 'https://mitpress.mit.edu/sites/default/files/styles/large_book_cover/http/mitp-content-server.mit.edu%3A18180/books/covers/cover/%3Fcollid%3Dbooks_covers_0%26isbn%3D9780262033848%26type%3D.jpg?itok=0zBreuLA',
    topic: ['computer science', 'math']
  },
  {
    title: 'Hundred Page Machine Learning Book',
    author: 'Andriy Burkov',
    image: 'https://images-eu.ssl-images-amazon.com/images/I/41drCUhCzmL.jpg',
    topic: ['computer science']
  },
  {
    title: 'Computer Systems',
    author: '',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41AoUQujOCL._SX387_BO1,204,203,200_.jpg',
    topic: ['computer science']
  },
  {
    title: 'Introduction to Networks',
    author: '',
    image: '',
    topic: ['computer science']
  },
]

const TopicChip = ({ topic }) => (
  <View style={styles.topicChip}>
    <Text>{topic}</Text>
  </View>
)

export default function HomeScreen() {
  const [search, onChangeSearch] = useState('')
  const [topic, setTopic] = useState('astronomy')

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.containeritems} >
          <TextInput
            onChangeText={text => onChangeSearch(text)}
            value={search}
            placeholder="Search for Questions"
          />
      </View>
    <View style={styles.containeritems} >
        <RNPickerSelect 
            placeholder={{
              label: 'Select a Field',
              value: 'astronomy',
              color: 'blue',
            }}
            onValueChange={(value) => setTopic(value)}
            items={[
                { label: 'Anatomy', value: 'anatomy' },
                { label: 'Astronomy', value: 'astronomy' },
                { label: 'Biology', value: 'biology' },
                { label: 'Chemistry', value: 'chemistry' },
                { label: 'Computer Science', value: 'computer science'},
                { label: 'Math', value: 'math' },
                { label: 'Physics', value: 'physics' },
            ]}
        />
      </View>
      </ScrollView>
      <View>
        <Text style={styles.collectiontitle}>{ topic.charAt(0).toUpperCase() + topic.slice(1)} Textbooks</Text>
      </View>
      
      <ScrollView style={styles.textbooksContainer}>
        {textbooks.map((book, index) => (
          <View style={styles.bookCard}>
              <Image style={styles.textbookImage} source={{ uri: book.image }} />
              <View style={styles.textbookInfo} >
                <Title>{book.title}</Title>
                <Paragraph>{book.author}</Paragraph>
                {book.topic.map((t, i) => (
                  <TopicChip topic={t}></TopicChip>
                ))}
              </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  bookCard: {
    // maxWidth: 200,
    // backgroundColor: '#378be5',
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // shadowOffset:{  width: 3,  height: 3,  },
    shadowRadius: 10,
    shadowColor: '#333',
    shadowOpacity: 0.5,
  },
  topicChip: {
    padding: 3
    // backgroundColor: '#FFFFFF'
  },
  horzscroll: {
    height: 125,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft:5,
  },
  textbooksContainer: {
    maxHeight: '80%',
  },
  textbookInfo: {
    paddingLeft: 30,
    width: '50%'
  },
  textbookImage: {
    width: 120,
    height: 150,
    padding: 2
  },
  containeritems: {
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 1,
    marginTop: 10,
    marginRight: 10
  },
  collectiontitle: {
    fontWeight: 'bold',
    fontSize: 19
  },
  contentContainer: {
    paddingTop: 20,
  },
});
