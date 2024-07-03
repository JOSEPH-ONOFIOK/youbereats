import type { Request, Response, NextFunction } from "express";

import { DatabaseInterface, Firstname, Lastname, User } from "ubereats-types";


export class UsernameController {
    constructor(private readonly database: DatabaseInterface<User>) {
    }
}