import { Request, Response, NextFunction } from "express";

export function isEmpty<T extends any[] | Record<any, any> | string>(arg: T): boolean {
    if (Array.isArray(arg) || typeof arg === "string") return arg.length === 0;

    if (typeof arg === "object") return Object.keys(arg).length === 0;

    return true;
}

export const catchAsyncErrors = (fn: Function) => (
    (req: Request, res: Response, next: NextFunction) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch((err: any) => next(err));
        }
    }
);