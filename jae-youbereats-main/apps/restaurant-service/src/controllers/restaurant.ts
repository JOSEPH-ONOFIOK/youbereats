import { NextFunction, Request, Response } from "express";
import { and, eq, sql } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";

import { RestaurantSchema, restaurants } from "../schema/restaurant";
import { db, dbClient } from "../config/database";
import { isEmpty } from "../utils/helpers";


class RestaurantController {
    // private repository: DatabaseInterface<RestaurantSchema>;

    constructor() {
        // this.repository = new MenuItemRepository(dbClient);
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<Response<RestaurantSchema> | void> {
        const { id: restaurantId } = req.params;

        try {
           const data = await db
               .select()
               .from(restaurants)
               .where(eq(restaurants.id, restaurantId));
    
           return res.json({ success: true, payload: data });
       } catch (error) {
            return next(error)
       }
    }

    async getMany(req: Request, res: Response, next: NextFunction) {
        const limit = parseInt(req.query.limit as string) || 1;
        const page = parseInt(req.query.page as string) || 10;

        const offset = (page - 1) * limit;

        try {
            const restaurantCount = await db
                .select({ count: sql<number>`count(*)` })
                .from(restaurants);

            const totalRestaurants = restaurantCount[0].count;

            const paginatedRestaurants = await db.select()
                .from(restaurants)
                .limit(limit)
                .offset(offset)
    
            return res.status(200).json({
                success: true,
                payload: {
                    restaurants: paginatedRestaurants,
                    current: page,
                    totalPages: Math.ceil(totalRestaurants / limit),
                    totalRestaurants
                }
            })
        } catch (error) {
            next(error);
            return;
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {        
        const payload = req.body;

        const nameExists = await db.select()
            .from(restaurants)
            .where(
                and(
                    eq(restaurants.name, payload.name), 
                    eq(restaurants.phone, payload.phone)
                )
            );

        if (!isEmpty(nameExists)) {
            const error = new Error();
            error.message = "restaurant name already exists.";
            next(error);
            return;
        }

        try { 
            // upload image from request to a cdn or bucket - ImageUploadService

            const data = await db
                .insert(restaurants)
                .values({...payload, id: uuid4()})
                .returning({ id: restaurants.id });

            // event for created restaurant event or pubsub
            // this can serve as duplicating the restaurant db on the users 
            // to keep of user's favourite restaurants or the other way around
            // the other way around so the user service doesnt have duplicates of all entity it references
            // and each service (if related) can have a duplicate of user instead
            return res.status(201).send({success: true, payload: data});
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id: restaurantId } = req.params;
        const payload = req.body;

        try {
            const existingId = await db.select()
                .from(restaurants)
                .where(eq(restaurants.id, restaurantId)
            );

            if (isEmpty(existingId)) {
                const error = new Error();
                error.message = "Invalid Payload.";
                next(error);
                return;
            }

            const updatedRestuarant = await db.update(restaurants)
                .set({ 
                    address: payload.address, 
                    phone: payload.phone,
                    location: payload.location,
                    cuisines: payload.cuisines,
                    name: payload.name
                })
                .where(eq(restaurants.id, restaurantId))
                .returning();
            
            return res.status(201).json({ success: true, payload: updatedRestuarant })
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response) {
        const {id: restaurantId} = req.params;

        try {
            await db.delete(restaurants)
                .where(eq(restaurants.id, restaurantId))
            
            return res.status(200).json({ success: true, payload: null }); 
        } catch (error) {
            console.log(`DB Error: ${error}`);
        }
    }
}

export const restaurantController = new RestaurantController();

// code to check for existence is repeated