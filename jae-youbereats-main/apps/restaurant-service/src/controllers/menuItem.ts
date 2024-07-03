import { Request, Response, NextFunction } from "express";

import { ControllerResponse, DatabaseInterface, MenuItem } from "../types";
import { isEmpty } from "../utils/helpers";


export class MenuItemController {
    private readonly repository;

    constructor(repository: DatabaseInterface<MenuItem>) {
        this.repository = repository;
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.repository.getById(req.params.menuItemId);

        console.log({result})

        return res.json({
            success: true,
            payload: result
        });
    }

    getMany = async (req: Request, res: Response, next: NextFunction) => {
        const limit = parseInt(req.query.limit as string);
        const page = parseInt(req.query.page as string);

        const result = await this.repository.getMany(limit, page);
        const totalRestaurants = await this.repository.count();
        const totalPages = Math.ceil(totalRestaurants / limit);

        return res.json({
            success: true,
            payload: {
                paginatedResult: result,
                page,
                totalPages,
                totalRestaurants
            }
        });
    }

    create = async (req: Request, res: Response, next: NextFunction) =>{
        const payload = req.body;
        
        try {
            const result = await this.repository.create(payload);

            return res.status(201).send(result);
        } catch (error) {
            return next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        const id = req.params.menuItemdId || payload.id;

        const result = await this.repository.update(id, payload);

        return res.json({
            success: true,
            payload: result
        });
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.menuItemdId;
        
        this.repository.delete(id);

        return res.json({
            success: true,
            payload: null
        });
    }
}