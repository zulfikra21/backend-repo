// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore/lite"
import * as admin from "firebase-admin";
// import * admin from
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "ebuddy-test-aaa6f",
  databaseURL:"127.0.0.1:8080"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore()
connectFirestoreEmulator(db, "127.0.0.1", 8080)
