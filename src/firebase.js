import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVWy7HZPYPbHOCqDJpsTFbKpE9Txy6kzI",
  authDomain: "jravel.firebaseapp.com",
  databaseURL: "https://jravel-default-rtdb.firebaseio.com",
  projectId: "jravel",
  storageBucket: "jravel.appspot.com",
  messagingSenderId: "258944058028",
  appId: "1:258944058028:web:34223e28878bb11cb21509",
  measurementId: "G-W4S1XY4N40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 