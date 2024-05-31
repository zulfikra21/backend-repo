"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_1 = require("../config/auth");
const ApiError_1 = __importDefault(require("../entities/ApiError"));
function auth(req, res, next, roles) {
    let authorization = "";
    let token = "";
    let data = {};
    const apiError = new ApiError_1.default(res, req);
    try {
        authorization = req.headers["authorization"] || "";
        if (authorization === "" || authorization === undefined)
            throw "Unauthorized";
        token = authorization.split(" ");
        token = token[1];
        data = (0, auth_1.verifyToken)(token);
    }
    catch (error) {
        return apiError.unauthorized(error, "Unauthorized");
    }
    req.body.SESSION = data;
    if (roles[0] === "*")
        return next();
    roles = roles.filter((i) => i === data.userable_type);
    if (roles.length === 0)
        return apiError.unauthorized("unauthorized roles", "Unauthorized");
    return next();
}
exports.auth = auth;
