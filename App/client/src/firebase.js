// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFZA8Pv5gvr3YdBEUZUnif1Sp8WXzvbX8",
  authDomain: "mern-community-539fc.firebaseapp.com",
  projectId: "mern-community-539fc",
  storageBucket: "mern-community-539fc.appspot.com",
  messagingSenderId: "261442389242",
  appId: "1:261442389242:web:d4b09688ee42a9d85bb543",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
