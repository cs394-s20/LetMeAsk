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
            <View style={styles.containeritems} >
                <TouchableWithoutFeedback
                onPress={() => setCurrentBook(null)}
                >
                    <AntDesign
                        name="leftcircleo"
                        style={{ color: "gray", fontSize: 40 }}
                    />
                </TouchableWithoutFeedback>
                <TextInput
                    style={{ height: 40, width: '85%', borderColor: 'gray', borderRadius: 10, borderWidth: 1, marginLeft: 10, paddingLeft: 10 }}
                    onChangeText={text => onChangeSearch(text)}
                    value={search}
                    placeholder="Search for Questions"
                />
            </View>
            <ScrollView style={{maxHeight: '90%'}}>
                <View style={{ alignItems: "left", justifyContent: "top", flex: 1, padding: 30}}>
                    <Text style={{ paddingBottom: 10, fontSize: 18, fontWeight:'bold' }}>Page 1</Text>
                    <Image style={styles.textbookImage} source={{ uri: book.image }} />
                </View>
                <View style={{ alignItems: "left", justifyContent: "top", flex: 1, paddingLeft: 30 }}>
                    <Text style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Page 2</Text>
                    <Image style={styles.textbookImage} source={{ uri: book.image }} />
                </View>
            </ScrollView>
        </View>
    );
}


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
    allQuestions: {
        alignItems: 'center'
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
        paddingTop: 20
    },
    collectiontitle: {
        fontWeight: 'bold',
        fontSize: 19
    },
    contentContainer: {
        paddingTop: 20,
    },
    textbookImage: {
        width: 330,
        height: 400
    },
});