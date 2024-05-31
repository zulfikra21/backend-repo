"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig_1 = require("./config/firebaseConfig");
async function build() {
    let userRef = (0, lite_1.collection)(firebaseConfig_1.db, "USERS");
    // console.log()
    (0, lite_1.setDoc)((0, lite_1.doc)(firebaseConfig_1.db, 'USERS', "1"), {
        "name": "zulfikra lahmudin abdjul",
        "email": "zulfikra@gmail.com",
        "password": "12345"
    });
}
build();
