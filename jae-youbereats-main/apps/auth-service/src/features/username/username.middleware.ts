import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { Firstname, Lastname, User } from "ubereats-types";


export function validateUser(req: Request, res: Response, next: NextFunction) {
    const firstname = req.body.firstname as Firstname;
    const lastname = req.body.firstname as Lastname;

    const valid = z.string().parse(firstname);
}