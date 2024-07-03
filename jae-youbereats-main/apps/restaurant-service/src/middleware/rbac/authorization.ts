import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../../types";


export function authorizeRole(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new Error("error in request");

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = verify(token, "supernicesecret") as Record<string, any>;
        const user = decodedToken as User;
    
        if (user.role === "vendor") {
            req.user = user;
            next();
        } else {
            throw new Error("Bad Request");
        }
    } catch (error) {
        next(error);
    }
}