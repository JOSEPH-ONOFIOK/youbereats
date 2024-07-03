import { relations } from "drizzle-orm";
import { pgTable, text, uuid, integer } from "drizzle-orm/pg-core";

import { restaurants } from "./restaurant";


export const menuitems = pgTable("menuitems", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	price: integer("price").notNull(),
	imageUrl: text("imageUrl").notNull(),
	restaurantId: uuid("restaurantId").references(() => restaurants.id).notNull(),
	// category: text("category").notNull()
});

export const menuitemsRelations = relations(menuitems, ({ one }) => ({
	restaurant: one(restaurants, {
		fields: [menuitems.restaurantId],
		references: [restaurants.id]
	})
}))

export type NewMenuItemSchema = typeof menuitems.$inferInsert;
export type MenuItemSchema = typeof menuitems.$inferSelect;