import * as WebBrowser from "expo-web-browser";
import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Title, Paragraph, Chip, Searchbar } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import Textbook from "../components/Textbook";
import { signout } from "./Login";
import { UserContext } from "../components/UserContext";
import firebase from "../shared/firebase";

//Expo Icon
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const HomeScreen = ({ username, navigation, route }) => {
  const [search, onChangeSearch] = useState("");
  const [topic, setTopic] = useState("astronomy");
  const [currentbook, setCurrentbook] = useState(null);
  const [books, setBooks] = useState([]);
  // const contextValue = useContext(UserContext);

  useEffect(() => {
    const booksRef = firebase.firestore().collection("Books");

    booksRef
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          setBooks((books) => books.concat({ id: doc.id, ...doc.data() }));
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    console.log(books);
  });

  const onSignedOut = () => {
    console.log("signed out");
    navigation.navigate("Login");
  };

  const handleBook = (book) => {
    setCurrentbook(book);
    return null;
  };

  if (currentbook === null) {
    return (
      <View style={styles.container}>
        {/* <Text>asdfasdfa: {contextValue}</Text> */}
        <Button title="Sign Out" onPress={() => signout(onSignedOut)}></Button>
        <Text>{username}</Text>
        <View style={styles.containeritems}>
          <Searchbar
            onChangeText={(text) => onChangeSearch(text)}
            value={search}
            placeholder="Search for Textbooks"
          />
        </View>
        <View style={styles.topicSelectionContainer}>
          <RNPickerSelect
            placeholder={{
              label: "Select a Field of Study",
              value: "astronomy",
              color: "blue",
            }}
            style={styles.topicSelection}
            onValueChange={(value) => setTopic(value)}
            items={[
              { label: "Anatomy", value: "anatomy" },
              { label: "Astronomy", value: "astronomy" },
              { label: "Biology", value: "biology" },
              { label: "Chemistry", value: "chemistry" },
              { label: "Computer Science", value: "computer science" },
              { label: "Math", value: "math" },
              { label: "Physics", value: "physics" },
            ]}
          />
        </View>
        <View>
          <Text style={styles.collectiontitle}>
            {topic.charAt(0).toUpperCase() + topic.slice(1)} Textbooks
          </Text>
        </View>

        <ScrollView style={styles.textbooksContainer}>
          {books.map((book, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleBook(book)}
            >
              <View style={styles.bookCard}>
                <Image
                  style={styles.textbookImage}
                  source={{ uri: book.image }}
                />
                <View style={styles.textbookInfo}>
                  <Title>{book.title}</Title>
                  <Text>
                    Authors:
                    {book.authors.map((a, i) => (
                      <Text key={i}>{a} , </Text>
                    ))}
                  </Text>
                  {/* <Paragraph>{book.author}</Paragraph> */}
                  {/* {book.topic.map((t, i) => (
                    <TopicChip topic={t}></TopicChip>
                  ))} */}
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <Textbook book={currentbook} setCurrentBook={setCurrentbook}></Textbook>
    );
  }
};

HomeScreen.navigationOptions = { headeLeft: null };

const styles = StyleSheet.create({
  bookCard: {
    // maxWidth: 200,
    // backgroundColor: '#378be5',
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    padding: 10,
    // shadowOffset:{  width: 3,  height: 3,  },
    shadowRadius: 10,
    shadowColor: "#333",
    shadowOpacity: 0.5,
  },
  topicChip: {
    color: "white",
    paddingVertical: 4,
    backgroundColor: "#233450",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 1,
  },
  topicChipText: {
    color: "white",
    fontSize: 10,
  },
  horzscroll: {
    height: 125,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingLeft:5,
  // },
  topicSelectionContainer: {
    marginVertical: 10,
  },
  topicSelection: {
    fontSize: 20,
  },
  textbooksContainer: {
    maxHeight: "80%",
  },
  textbookInfo: {
    paddingLeft: 30,
    width: "50%",
  },
  textbookImage: {
    width: 120,
    height: 150,
    padding: 2,
  },
  // containeritems: {
  //   paddingRight: 10,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   padding: 1,
  //   marginTop: 10,
  //   marginRight: 10
  // },
  collectiontitle: {
    fontWeight: "bold",
    fontSize: 19,
  },
  // contentContainer: {
  //   paddingTop: 20,
  // },
});

export default HomeScreen;
