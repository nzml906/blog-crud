import firebase from "firebase/app";
import firestore from "firebase/firestore"; // eslint-disable-line no-unused-vars

var firebaseConfig = {
  apiKey: "AIzaSyBwMWRR5EwnqdGLC9mcB_Mz21vXTB-MABo",
  authDomain: "keep-vue-b25bb.firebaseapp.com",
  databaseURL: "https://keep-vue-b25bb.firebaseio.com",
  projectId: "keep-vue-b25bb",
  storageBucket: "keep-vue-b25bb.appspot.com",
  messagingSenderId: "20000405228",
  appId: "1:20000405228:web:86c9f7bba8e87f3fb057c9",
};

const blog = firebase.initializeApp(firebaseConfig);

export default blog.firestore();
