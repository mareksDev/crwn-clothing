import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBlEnVlhLcF2wyTVAml2qDO2IiWpQ4paYg",
  authDomain: "crwn-db-79ced.firebaseapp.com",
  databaseURL: "https://crwn-db-79ced.firebaseio.com",
  projectId: "crwn-db-79ced",
  storageBucket: "crwn-db-79ced.appspot.com",
  messagingSenderId: "370657504508",
  appId: "1:370657504508:web:b25b234cd0d1c04115fb79",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
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
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
