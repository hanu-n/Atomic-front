import {initializeApp} from 'firebase/app'
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  applyActionCode,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmWCAszsxLixP8ALNjyCBc7tGCjuTNcXc",
  authDomain: "atomicmas.netlify.app",
  projectId: "clone-fd7d9",
  storageBucket: "clone-fd7d9.firebasestorage.app",
  messagingSenderId: "544508751843",
  appId: "1:544508751843:web:e947536be0f9b006397ad6",
  measurementId: "G-V7X2ZKGB9S"
};
const app=initializeApp(firebaseConfig)

export const auth=getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db=getFirestore(app)

// Action Code Settings for email verification
const actionCodeSettings = {
  url: `${window.location.origin}/verify-email`,
  handleCodeInApp: true,
};

// Email verification functions
export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user, actionCodeSettings);
    return { success: true, message: 'Verification email sent successfully!' };
  } catch (error) {
    console.error('Email verification error:', error);
    return { success: false, message: error.message };
  }
};

export const verifyEmailWithCode = async (oobCode) => {
  try {
    await applyActionCode(auth, oobCode);
    return { success: true, message: 'Email verified successfully!' };
  } catch (error) {
    console.error('Email verification error:', error);
    return { success: false, message: error.message };
  }
};
// Check if user is verified
export const isUserVerified = (user) => {
  return user && user.emailVerified;
};