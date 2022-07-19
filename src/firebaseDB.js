import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAFSlNSMI7Tfuhv9vBDQ4j3U9Dai4MSwls",
    authDomain: "vue-firebase-crud-511fe.firebaseapp.com",
    projectId: "vue-firebase-crud-511fe",
    storageBucket: "vue-firebase-crud-511fe.appspot.com",
    messagingSenderId: "55368239793",
    appId: "1:55368239793:web:39a085dc5bf582f17cb090",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
