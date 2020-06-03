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

  // useEffect(() => {
  //   console.log(books);
  // });

  const onSignedOut = () => {
    console.log("signed out");
    navigation.navigate("Login");
  };

  const getPages = async () => {
    let questionsRef = db.collection("Questions");
    let query = questionsRef
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("SNAPSHOT IS EMPTY!!!!!!!!!!!!!!!!!!!!!");
        }
        snapshot.forEach((doc) => {
          const question = doc.data().question;
          const questionID = doc.id;
          const ISBN = doc.data().isbn;
          const pageNumber = doc.data().page;
          const questionObj = {
            id: questionID,
            question: question,
            isbn: ISBN,
            page: pageNumber,
          };
          setMyQuestions((oldArray) => [...oldArray, questionObj]);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };

  const handleBook = (book) => {
    setCurrentbook(book);
    return null;
  };

  if (currentbook === null) {
    return (
      <View style={styles.container}>
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
              onPress={() =>
                navigation.navigate("Page Directory", {
                  navigation: navigation,
                  route: route,
                  ISBN: books[index].id,
                  pages: books[index].pages,
                  questions: books[index].questions,
                })
              }
            >
              <View style={styles.bookCard}>
                <Image
                  style={styles.textbookImage}
                  source={{ uri: book.image }}
                />
                <View style={styles.textbookInfo}>
                  <Title>{book.title}</Title>
                  <Text>
                    Authors:{" "}
                    {book.authors.map((a, i) => (
                      <Text key={i}>{a}, </Text>
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

  collectiontitle: {
    fontWeight: "bold",
    fontSize: 19,
  },
});

export default HomeScreen;

// import * as WebBrowser from "expo-web-browser";
// import React, { useState, useContext, useEffect } from "react";
// import {
//   Image,
//   Platform,
//   StyleSheet,
//   //   Text,
//   TouchableOpacity,
//   View,
//   Button,
//   TouchableWithoutFeedback,
// } from "react-native";

// import {
//   Container,
//   Header,
//   Content,
//   Card,
//   CardItem,
//   Text,
//   Icon,
//   Right,
// } from "native-base";

// import { signout } from "./Login";
// import { UserContext } from "../components/UserContext";
// import firebase from "../shared/firebase";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const db = firebase.firestore();

// export default function ProfessorHome({ navigation, route }) {
//   const [myQuestions, setMyQuestions] = useState([]);

//   useEffect(() => {
//     getAllQuestions();
//   }, []);

//   const onSignedOut = () => {
//     console.log("signed out");
//     navigation.navigate("Login");
//   };

// const getAllQuestions = async () => {
//   let questionsRef = db.collection("Questions");
//   let query = questionsRef
//     .get()
//     .then((snapshot) => {
//       if (snapshot.empty) {
//         console.log("SNAPSHOT IS EMPTY!!!!!!!!!!!!!!!!!!!!!");
//       }
//       snapshot.forEach((doc) => {
//         const question = doc.data().question;
//         const questionID = doc.id;
//         const ISBN = doc.data().isbn;
//         const pageNumber = doc.data().page;
//         const questionObj = {
//           id: questionID,
//           question: question,
//           isbn: ISBN,
//           page: pageNumber,
//         };
//         setMyQuestions((oldArray) => [...oldArray, questionObj]);
//       });
//     })
//     .catch((err) => {
//       console.log("Error getting documents", err);
//     });
// };

//   const QuestionList = () =>
//     myQuestions.map((question, index) => (
//       <CardItem
//         button
//         key={index}
//         onPress={() =>
//           navigation.navigate("Respond", {
//             route: route,
//             questionID: myQuestions[index].id,
//             question: myQuestions[index].question,
//             ISBN: myQuestions[index].isbn,
//             pageNumber: myQuestions[index].page,
//           })
//         }
//       >
//         <Text>{question.question}</Text>
//         <Right>
//           <MaterialCommunityIcons
//             name="chevron-right"
//             size={50}
//             color="#378BE5"
//           />
//         </Right>
//       </CardItem>
//     ));

//   return (
//     <View>
//       <Button title="Sign Out" onPress={() => signout(onSignedOut)}></Button>
//       {/* <Button title="GET QUESITONS" onPress={getAllQuestions}></Button> */}
//       <Text style={{ margin: 10 }}>EXPERT HOME</Text>
//       <QuestionList />
//     </View>
//   );
// }
