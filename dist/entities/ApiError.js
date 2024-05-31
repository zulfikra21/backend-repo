"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../controller/api");
class ApiError {
    constructor(res, req) {
        this.res = res;
        this.req = req;
    }
    badRequest(err, message) {
        console.error(err);
        return this.res.status(400).json(this.responseJson = {
            message: message,
            status: api_1.Status.ERROR,
            data: {},
            length: 0
        });
    }
    unauthorized(err, message) {
        console.log(err);
        return this.res.status(401).json(this.responseJson = {
            message: (!message) ? "Unauthorized" : message,
            status: api_1.Status.FAIL,
            data: {},
            length: 0
        });
    }
    ok(data, message) {
        return this.res.status(200).json(this.responseJson = {
            message,
            status: api_1.Status.SUCCESS,
            data,
            length: data.length,
        });
    }
}
exports.default = ApiError;
