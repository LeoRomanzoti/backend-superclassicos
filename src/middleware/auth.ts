import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req?.headers.authorization?.split(" ")[1];
    const secrety_key = "supersecrety";

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, secrety_key, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).send({
                message: "Unauthorized!",
            });
        }
        req.user = decoded.user;
        next();
    });
};
