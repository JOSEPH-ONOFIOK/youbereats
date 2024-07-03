import { Request, Response, NextFunction } from "express";
import { insertRestaurantSchema } from "../../schema/restaurant";
import { ZodError } from "zod";


export function validationPipe(req: Request, res: Response, next: NextFunction) {
    const resquestSchema = insertRestaurantSchema.pick({
        name: true,
        description: true,
        phone: true,
        cuisines: true,
        address: true,
        location: true,
        opening_hours: true,
        image: true
    });

    try {
        const restaurantData = req.body;
        
        try {
            resquestSchema.parse(restaurantData);
        } catch (error) {
            if (error instanceof ZodError) {
                next(error);
                return;
            }
        }
        next();
    } catch (error) {
        console.log(`Parser Error: ${error}`);
    }
}

export function validateUUID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
        const error = new Error();
        error.message = "Invalid Id";
        next(error);
    }
    next();
}