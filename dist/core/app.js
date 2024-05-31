"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// initial server
const app = (0, express_1.default)();
const port = process.env.PORT;
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.options("*",cors("*"));
app.use((0, cors_1.default)());
// Config body parser of JSON
app.use(body_parser_1.default.json());
// Routes
app.use("/", userRoutes_1.default);
app.listen(port, () => console.log("server run on port " + port));
