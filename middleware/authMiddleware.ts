import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/auth";
import { ResponseJson, Status } from "../controller/api";
import ApiError from "../entities/ApiError";


export function auth(req: Request, res: Response, next: NextFunction, roles: Array<string>) {
    let authorization: string = "";
    let token: any = "";
    let data: any = {};
    const apiError = new ApiError(res, req);
    try {
        authorization = req.headers["authorization"] || "";
        if (authorization === "" || authorization === undefined) throw "Unauthorized";
        token = authorization.split(" ");
        token = token[1];
        data = verifyToken(token)
    } catch (error) {
        return apiError.unauthorized(error, "Unauthorized")
    }
    req.body.SESSION = data;
    if (roles[0] === "*") return next();
    roles = roles.filter((i) => i === data.userable_type);
    if (roles.length === 0) return apiError.unauthorized("unauthorized roles", "Unauthorized")

    return next()
}