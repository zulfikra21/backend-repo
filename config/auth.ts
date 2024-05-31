import jwt from "jsonwebtoken"

export const verifyToken = (token:string) => jwt.verify(token, <string>process.env.PRIVATE_KEY);

export const generateToken = (data: any) => jwt.sign(data, <string>process.env.PRIVATE_KEY)