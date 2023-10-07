import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxZnIPnu0g2VtO8njqoWar-34RKDzUdgY",
  authDomain: "hamaragdk.firebaseapp.com",
  databaseURL: "https://hamaragdk-default-rtdb.firebaseio.com",
  projectId: "hamaragdk",
  storageBucket: "hamaragdk.appspot.com",
  messagingSenderId: "38073858200",
  appId: "1:38073858200:web:1eb0f5c919e536efa8b8ed",
  measurementId: "G-VNGV1DF2MN",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
