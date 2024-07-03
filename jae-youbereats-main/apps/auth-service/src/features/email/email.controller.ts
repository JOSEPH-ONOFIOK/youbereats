import type { NextFunction, Request, Response } from "express";
import { DatabaseInterface, User, Email } from "ubereats-types";


export class EmailController {
    constructor(private readonly database: DatabaseInterface<User>) {}

    validateEmail = async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;

        try {
            const result = await this.database.getOne(email);

            return res.json({ success: true, payload: result });
        } catch (error) {
            next(error);
        }
    }

    updateEmail = async (req: Request, res: Response, next: NextFunction) => {
        const id = ""; // from authHeader
        const payload = req.body as User;

        try {
            const result = await this.database.update(id, payload);

            return res.json({ success: true, payload: result });
        } catch (error) {
            next(error);
        }
    }
}