import { Response,  Request } from "express";
import { ResponseJson, Status } from "../controller/api"

export default class ApiError {
    public res: Response;
    public responseJson: ResponseJson | undefined;
    public req: Request;
    constructor(res :Response,  req: Request,) {
        this.res = res;
        this.req = req
    }

    public badRequest(err: any, message: string) {
        console.error(err);
        return this.res.status(400).json(this.responseJson = {
            message: message,
            status: Status.ERROR,
            data: {},
            length:0
        })
    }

    public unauthorized(err: any, message?: string) {
        console.log(err)
        return this.res.status(401).json(this.responseJson = {
            message:(!message) ? "Unauthorized" : message,
            status: Status.FAIL,
            data: {},
            length:0
        })
    }

    public ok(data: any, message: string) {
        return this.res.status(200).json(this.responseJson = {
            message,
            status: Status.SUCCESS,
            data,
            length: data.length,
        })
    }
}