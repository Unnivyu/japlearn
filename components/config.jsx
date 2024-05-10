// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcGwh3KRdPWU-hniDezU8I46BXQkZ0TME",
  authDomain: "jplearn-7c5d3.firebaseapp.com",
  databaseURL: "https://jplearn-7c5d3-default-rtdb.firebaseio.com",
  projectId: "jplearn-7c5d3",
  storageBucket: "jplearn-7c5d3.appspot.com",
  messagingSenderId: "445006815546",
  appId: "1:445006815546:web:0c1373e2fd9aa641eeb003"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)  