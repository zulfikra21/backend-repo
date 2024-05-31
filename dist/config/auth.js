"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
exports.verifyToken = verifyToken;
const generateToken = (data) => jsonwebtoken_1.default.sign(data, process.env.PRIVATE_KEY);
exports.generateToken = generateToken;
