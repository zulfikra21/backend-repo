import { Request, Response } from "express";
import { DocumentData, QuerySnapshot, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore/lite"
import { db } from "../config/firebaseConfig";
import ApiError from "../entities/ApiError";
import { generateToken } from "../config/auth";

export enum Status {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    ERROR = "ERROR"
}

export interface ResponseJson {
    status: Status;
    data: any;
    message: string;
    length: number
}

interface User {
    name: string,
    email: string,
    id: string
}

interface UserResponse {
    token: string,
    user: User
}


export class Api extends ApiError {

    // User collection
    public userRef = collection(db, "USERS");
    constructor(req: Request, res: Response) {
        super(res, req)
    }
    bindingData(data: QuerySnapshot) {
        let bind: any = []
        data.forEach((e: any) => {
            bind = bind.concat({
                ...e.data(),
                id: e.id
            })
        })
        return bind;
    }
    /**
     * 
     * @description fetch user data
     * @returns response json 
     */
    async fetchUserData() {
        let responseJson: ResponseJson;
        try {
            const userSnap = await getDocs(this.userRef);
            let users: any = []
            // Binding data from firestore
            users = this.bindingData(userSnap);
            responseJson = {
                status: Status.SUCCESS,
                data: users,
                message: "success",
                length: users.length
            }
        } catch (error) {
            console.error(error)
            return this.badRequest(error, "Something went wrong. API-70");
        }

        return this.res?.json(responseJson);
    }
    /**
     * @description update user data
     * @returns {Response}
     */
    async updateUserData() {
        try {
            const id = this.req.body.id 
            // delete id if exist
            delete this.req.body.SESSION;
            delete this.req.body.id;
            // update data by ID
            await setDoc(doc(db, "USERS",  id), {
                ...this.req.body
            });
        } catch (error) {
            return this.badRequest(error, "Something went wrong. API-80")
        }
        return this.ok({}, "Successfully updated")
    }

    /**
     * @description login
     * @returns Response
     */
    async login() {
        const { email, password } = this.req?.body;
        let users;

        try {
            // fetch data from firestore based on email
            let q = query(this.userRef, where("email", "==", email));
            let userSnap = await getDocs(q);

            users = this.bindingData(userSnap);
            console.log(users)
        } catch (error) {
            return this.badRequest(error, "something went wrong");
        }
        // validate is exist or not
        if (users.length === 0) return this.unauthorized("User not found");
        // validate password
        if (users[0].password !== password) return this.unauthorized("Wrong password", "invalid password or email");
        // assign a new variable to response token
        let new_user: UserResponse;
        new_user = {
            token: generateToken(users[0]),
            user: users[0]
        };
        return this.ok(new_user, "")
    }
}