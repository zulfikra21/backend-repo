"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.Status = void 0;
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig_1 = require("../config/firebaseConfig");
const ApiError_1 = __importDefault(require("../entities/ApiError"));
const auth_1 = require("../config/auth");
var Status;
(function (Status) {
    Status["SUCCESS"] = "SUCCESS";
    Status["FAIL"] = "FAIL";
    Status["ERROR"] = "ERROR";
})(Status || (exports.Status = Status = {}));
class Api extends ApiError_1.default {
    constructor(req, res) {
        super(res, req);
        // User collection
        this.userRef = (0, lite_1.collection)(firebaseConfig_1.db, "USERS");
    }
    bindingData(data) {
        let bind = [];
        data.forEach((e) => {
            bind = bind.concat({
                ...e.data(),
                id: e.id
            });
        });
        return bind;
    }
    /**
     *
     * @description fetch user data
     * @returns response json
     */
    async fetchUserData() {
        let responseJson;
        try {
            const userSnap = await (0, lite_1.getDocs)(this.userRef);
            let users = [];
            // Binding data from firestore
            users = this.bindingData(userSnap);
            responseJson = {
                status: Status.SUCCESS,
                data: users,
                message: "success",
                length: users.length
            };
        }
        catch (error) {
            console.error(error);
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
            const id = this.req.body.id;
            // delete id if exist
            delete this.req.body.SESSION;
            delete this.req.body.id;
            // update data by ID
            await (0, lite_1.setDoc)((0, lite_1.doc)(firebaseConfig_1.db, "USERS", id), {
                ...this.req.body
            });
        }
        catch (error) {
            return this.badRequest(error, "Something went wrong. API-80");
        }
        return this.ok({}, "Successfully updated");
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
            let q = (0, lite_1.query)(this.userRef, (0, lite_1.where)("email", "==", email));
            let userSnap = await (0, lite_1.getDocs)(q);
            users = this.bindingData(userSnap);
            console.log(users);
        }
        catch (error) {
            return this.badRequest(error, "something went wrong");
        }
        // validate is exist or not
        if (users.length === 0)
            return this.unauthorized("User not found");
        // validate password
        if (users[0].password !== password)
            return this.unauthorized("Wrong password", "invalid password or email");
        // assign a new variable to response token
        let new_user;
        new_user = {
            token: (0, auth_1.generateToken)(users[0]),
            user: users[0]
        };
        return this.ok(new_user, "");
    }
}
exports.Api = Api;
