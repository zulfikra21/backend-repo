"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const authMiddleware_1 = require("../middleware/authMiddleware");
// init route 
const route = express_1.default.Router();
// Login route
route.post("/login", (req, res) => new api_1.Api(req, res).login());
// Fetch user data
route.get("/fetch-user-data", (req, res, next) => (0, authMiddleware_1.auth)(req, res, next, ['*']), (req, res) => new api_1.Api(req, res).fetchUserData());
// Update user data
route.put("/update-user-data", (req, res, next) => (0, authMiddleware_1.auth)(req, res, next, ['*']), (req, res) => new api_1.Api(req, res).updateUserData());
exports.default = route;
