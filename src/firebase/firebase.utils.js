import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDIpRoMGeivTQmbGF02gUREJ6OAnEetqfU",
  authDomain: "crwn-db-783c9.firebaseapp.com",
  projectId: "crwn-db-783c9",
  storageBucket: "crwn-db-783c9.appspot.com",
  messagingSenderId: "72398977546",
  appId: "1:72398977546:web:3c978cd72d3e97c11b7df3",
  measurementId: "G-HWWE8VDZ15",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  console.log("snapshot", snapshot);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error!", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
