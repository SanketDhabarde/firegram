import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7A2s1II5arBFNw38RhTQdz0ShKMWouB0",
    authDomain: "firegram-62be6.firebaseapp.com",
    databaseURL: "https://firegram-62be6-default-rtdb.firebaseio.com",
    projectId: "firegram-62be6",
    storageBucket: "firegram-62be6.appspot.com",
    messagingSenderId: "459203558763",
    appId: "1:459203558763:web:6bcfde8a204826909ca02e",
    measurementId: "G-L5GKWMLK84"
  };

  firebase.initializeApp(firebaseConfig);

  const projectFirestore = firebase.firestore();
  const projectStorage = firebase.storage();

  export {projectFirestore, projectStorage};