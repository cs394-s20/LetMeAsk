import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw9mT4kgFm5C510t88wNFViZJXxYd9Zp0",
  authDomain: "letmeask-e07af.firebaseapp.com",
  databaseURL: "https://letmeask-e07af.firebaseio.com",
  projectId: "letmeask-e07af",
  storageBucket: "letmeask-e07af.appspot.com",
  messagingSenderId: "431381968564",
  appId: "1:431381968564:web:88796cb07396cbedb949e1",
  measurementId: "G-FJCV2E9WK2",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
