import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';

//Expo Icon
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
    AntDesign
} from "@expo/vector-icons";


export default function Textbook({book, setCurrentBook}) {
    const [search, onChangeSearch] = useState('')
    console.log(book)

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.containeritems} >
                    <TouchableWithoutFeedback
                    onPress={() => setCurrentBook(null)}
                    >
                        <AntDesign
                            name="leftcircleo"
                            style={{ color: "black", fontSize: 40 }}
                        />
                    </TouchableWithoutFeedback>
                    <TextInput
                        style={{ height: 40, width: '85%', borderColor: 'gray', borderWidth: 1, marginLeft: 10 }}
                        onChangeText={text => onChangeSearch(text)}
                        value={search}
                        placeholder="Search for Questions"
                    />
                </View>

            </ScrollView>
            <View>
                <Text style={styles.collectiontitle}>Answered Questions</Text>
            </View>

            <ScrollView style={styles.horzscroll} horizontal={true} decelerationRate={0} snapToInterval={200} snapToAlignment={"center"}>
                <Card style={styles.answeredQ}>
                    <Card.Content>
                        <Title>Do jellyfish sleep?</Title>
                        <Paragraph>If so, how do they sleep? Are they able to close their eyes?</Paragraph>
                        <Ionicons
                            name="ios-heart"
                            style={{ color: "#fff", fontSize: 40 }}
                        />
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
                <Text style={styles.collectiontitle}>Unanswered Questions</Text>
            </View>
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                snapToAlignment={"center"}
                style={styles.horzscroll}
            >
                <Card style={styles.unansweredQ}>
                    <Card.Content>
                        <Title>Do jellyfish sleep?</Title>
                        <Paragraph>If so, how do they sleep?</Paragraph>
                        <Ionicons
                            name="ios-chatboxes"
                            style={{ color: "#fff", fontSize: 40 }}
                        />
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

// HomeScreen.navigationOptions = {
//     header: null,
// };


const styles = StyleSheet.create({
    answeredQ: {
        height: '80%',
        maxWidth: 200,
        backgroundColor: '#378be5',
        margin: 10,
    },
    unansweredQ: {
        height: '80%',
        backgroundColor: '#e57359',
        margin: 10
    },
    horzscroll: {
        height: 125,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 5,
    },
    containeritems: {
        flex: 1,
        flexDirection: "row",
        paddingRight: 10,
    },
    collectiontitle: {
        fontWeight: 'bold',
        fontSize: 19
    },
    contentContainer: {
        paddingTop: 20,
    },
});