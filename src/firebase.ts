import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoswW1WL7tz2be0Gzx6gCHiBSF4Qkg5sg",
  authDomain: "xbox-gamepass.firebaseapp.com",
  projectId: "xbox-gamepass",
  storageBucket: "xbox-gamepass.appspot.com",
  messagingSenderId: "985547142537",
  appId: "1:985547142537:web:0e7f281933893b851a9d58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

connectFirestoreEmulator(db, "localhost", 8080);
