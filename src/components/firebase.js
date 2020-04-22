import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxoZ1VGakHjdbGp86VWNhxLLii950LDuI",
  authDomain: "excelmec.firebaseapp.com",
  databaseURL: "https://excelmec.firebaseio.com",
  projectId: "excelmec",
  storageBucket: "excelmec.appspot.com",
  messagingSenderId: "891600293843",
  appId: "1:891600293843:web:a46f63f5312d92448be926",
  measurementId: "G-MPFWYWL7ZD",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default db;
