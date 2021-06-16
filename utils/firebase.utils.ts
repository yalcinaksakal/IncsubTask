import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAhls6Sx2TmAUuLSPwgvcw9Z-HnkD9YiSI",
  authDomain: "incsub-2f0a9.firebaseapp.com",
  projectId: "incsub-2f0a9",
  storageBucket: "incsub-2f0a9.appspot.com",
  messagingSenderId: "23529142116",
  appId: "1:23529142116:web:0ea4fd14788db725c16c71",
  measurementId: "G-DV1XWWZCCE",
};

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData?: any
): Promise<firebase.firestore.DocumentReference | null> => {
  if (!userAuth) return null;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  // get, set, update, delete
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (err) {
      console.log("error creating user: ", err.message);
    }
  }
  return userRef;
};

if (!firebase.apps.length) firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const authProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
