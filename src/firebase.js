import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVWy7HZPYPbHOCqDJpsTFbKpE9Txy6kzI",
  authDomain: "jravel.firebaseapp.com",
  databaseURL: "https://jravel-default-rtdb.firebaseio.com",
  projectId: "jravel",
  storageBucket: "jravel.firebasestorage.app",
  messagingSenderId: "258944058028",
  appId: "1:258944058028:web:34223e28878bb11cb21509",
  measurementId: "G-W4S1XY4N40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 