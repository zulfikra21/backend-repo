import { collection, doc, setDoc } from "firebase/firestore/lite";
import { db } from "./config/firebaseConfig";

async function build() {
    let userRef =  collection(db, "USERS")
    // console.log()
    setDoc(doc(db,'USERS', "1"),{
        "name": "zulfikra lahmudin abdjul",
        "email":"zulfikra@gmail.com",
        "password":"12345"
    })
}

build()