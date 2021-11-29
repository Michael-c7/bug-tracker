
// import FirebaseAuth from "react-firebaseui"
import { getAuth } from  "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
// Add SDKs for Firebase products that you want to use
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)