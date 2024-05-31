"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
// import * admin from
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    projectId: "ebuddy-test-aaa6f",
    databaseURL: "127.0.0.1:8080"
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, lite_1.getFirestore)();
(0, lite_1.connectFirestoreEmulator)(exports.db, "127.0.0.1", 8080);
