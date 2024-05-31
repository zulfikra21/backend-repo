import express, { Request } from "express"
import { Api } from "../controller/api";
import { auth } from "../middleware/authMiddleware";

// init route 
const route = express.Router();


// Login route
route.post("/login", (req, res) => new Api(req, res).login())
// Fetch user data
route.get("/fetch-user-data",
    (req, res, next) => auth(req, res, next, ['*']),
    (req, res) => new Api(req, res).fetchUserData())
// Update user data
route.put("/update-user-data",
    (req, res, next) => auth(req, res, next, ['*']),
    (req, res) => new Api(req, res).updateUserData())

export default route