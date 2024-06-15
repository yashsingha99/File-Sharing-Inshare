import { getAnalytics } from  "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// import  dotenv  from 'dotenv';
// dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyApzO0a8rhftIJI0WYkAxJOcr4Ce6U8_h8",
  authDomain: "inshare-49986.firebaseapp.com",
  projectId: "inshare-49986",
  storageBucket: "inshare-49986.appspot.com",
  messagingSenderId: "767693316440",
  appId: "1:767693316440:web:14b6149a7b99f77320052d",
  measurementId: "G-NZP31WM9W0"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
