import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDQWC9pQftRnlk0j9Gs_fHAdOf4nnXTIWc",
    authDomain: "m-city-bdcd7.firebaseapp.com",
    databaseURL: "https://m-city-bdcd7.firebaseio.com",
    projectId: "m-city-bdcd7",
    storageBucket: "m-city-bdcd7.appspot.com",
    messagingSenderId: "791252783317"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

firebaseDB.ref('matches').once('value').then((snapshot) => {
    console.log(snapshot.val())
    
})
