import { and, eq, sql } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";
import { drizzle } from "drizzle-orm/node-postgres";

import { MenuItemSchema, menuitems } from "../schema/menuItem";
import { DatabaseInterface, MenuItem } from "../types";
import { dbClient } from "../config/database";
import { isEmpty } from "../utils/helpers";


export class MenuItemRepository implements DatabaseInterface<MenuItem> {
    private readonly db: ReturnType<typeof drizzle> =  drizzle(dbClient);
    private readonly entity: typeof menuitems = menuitems;

    constructor() {}

    async create(payload: MenuItemSchema): Promise<MenuItem> {
        const result = await this.db
            .insert(this.entity)
            .values({...payload, id: uuid4()})
            .returning();

        return result[0];
    }

    async getById(id: string): Promise<MenuItem | null> {
        console.log({ id })
        const data = await this.db
            .select()
            .from(this.entity)
            .where(eq(this.entity.id, id));

        console.log("DATA ", data)

        return isEmpty(data) ? null : data[0];
    }

    async getMany(limit: number, page: number): Promise<MenuItem[] | null> {
        const offset = (page - 1) * limit;

        const paginatedMenuItems = await this.db.select()
            .from(this.entity)
            .limit(limit)
            .offset(offset)

        return isEmpty(paginatedMenuItems) ? null : paginatedMenuItems;
    }
    
    async count(): Promise<number> {
        const restaurantCount = await this.db
                .select({ count: sql<number>`count(*)` })
                .from(this.entity);

        return restaurantCount[0].count;
    } 

    async delete(id: string) {
        await this.db.delete(this.entity).where(eq(this.entity.id, id));
    }

    async update(id: string, payload: MenuItem): Promise<MenuItem | null> {
        const existingMenuItem = await this.getById(id);

        if (!existingMenuItem) {
            throw new Error("Invalid ID");
        }

        const updatedRestuarant = await this.db.update(this.entity)
            .set({ 
                name: payload.name || existingMenuItem.name,
                description: payload.description,
                price: payload.price,
                imageUrl: payload.imageUrl || existingMenuItem.imageUrl
            })
            .where(eq(this.entity.id, id))
            .returning();
        
        return isEmpty(updatedRestuarant) ? null : updatedRestuarant[0];
    }
}