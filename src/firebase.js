import firebase from "firebase/compat/app";
//import firebase from  'firebase/app';
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDbClyTrsK_JqbWmt1GCV3hzuT3XsJCL-Y",
  authDomain: "auth-development-e065c.firebaseapp.com",
  projectId: "auth-development-e065c",
  storageBucket: "auth-development-e065c.appspot.com",
  messagingSenderId: "1098550389504",
  appId: "1:1098550389504:web:24e5c92fa43a8d54be61e5"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;
