import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

firestore
  .collection("users")
  .doc("g5hW8DXNBI8vNO6WXTsP")
  .collection("cartItems")
  .doc("SpMAjGmZgCfvtS3HpwKO");

firestore.doc("users/g5hW8DXNBI8vNO6WXTsP/cartItems/SpMAjGmZgCfvtS3HpwKO");

firestore.collection("users/g5hW8DXNBI8vNO6WXTsP/cartItems");
