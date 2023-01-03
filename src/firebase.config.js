import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCVu2HCBRm0JMYmbEx_a_XTdKvcFxE988M",
  authDomain: "realtimechat-4b932.firebaseapp.com",
  projectId: "realtimechat-4b932",
  storageBucket: "realtimechat-4b932.appspot.com",
  messagingSenderId: "70532817602",
  appId: "1:70532817602:web:6deacb567b63c76e09515b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
