import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkToxZr5Uh3uJryYM1peeP8LDGc38_HZU",
  authDomain: "upload-file-333f6.firebaseapp.com",
  projectId: "upload-file-333f6",
  storageBucket: "upload-file-333f6.appspot.com",
  messagingSenderId: "79234077686",
  appId: "1:79234077686:web:e9fab519debc0f71faedd7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebaseApp;
