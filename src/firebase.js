
import FirebaseAuth from "react-firebaseui"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from  "firebase/auth"
import React, {useState, useEffect} from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import secretData from "./secretData";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:secretData.apiKey,
  authDomain:secretData.authDomain,
  projectId:secretData.projectId,
  storageBucket:secretData.storageBucket,
  messagingSenderId:secretData.messagingSenderId,
  appId:secretData.appId,
};

//  appId:  process.env.REACT_APP_APP_ID,
// figure out .env files later

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export const signUp = (email, password) => {
  let unmounted = false;
  if(!unmounted) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  return () => {
    unmounted = true;
  }
}

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  // always want auth in any func from firebase
  return signOut(auth)
}


// custom hook
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    let unmounted = false;

    if(!unmounted) {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsub; 
    }

    return () => {
        unmounted = true;
    }
  }, [])

  return currentUser;
}
