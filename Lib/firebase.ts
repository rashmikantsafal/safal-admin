import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwn_c7G7MOzxrydTO0w5xf_tN_lzDtezQ",
  authDomain: "safal-educare-application.firebaseapp.com",
  projectId: "safal-educare-application",
  storageBucket: "safal-educare-application.firebasestorage.app",
  messagingSenderId: "264995111376",
  appId: "1:264995111376:web:fe36a5ea9db513b6efb9d5",
  measurementId: "G-8YGDRHTWGS"
};

// Next.js માં વારંવાર પેજ રિફ્રેશ થાય ત્યારે એરર ના આવે તે માટે આ મુજબ એપ શરૂ કરવી:
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);