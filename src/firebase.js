import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDmWCAszsxLixP8ALNjyCBc7tGCjuTNcXc",
  authDomain: "clone-fd7d9.firebaseapp.com",
  projectId: "clone-fd7d9",
  storageBucket: "clone-fd7d9.firebasestorage.app",
  messagingSenderId: "544508751843",
  appId: "1:544508751843:web:e947536be0f9b006397ad6",
  measurementId: "G-V7X2ZKGB9S"
};

const app=initializeApp(firebaseConfig)

export const auth=getAuth(app)
export const db=getFirestore(app)