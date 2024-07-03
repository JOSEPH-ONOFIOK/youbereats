import { relations } from "drizzle-orm";
import { pgTable, text, uuid, jsonb, pgSchema } from "drizzle-orm/pg-core";
import { Address, CardDetails, DeliveryAddress } from "ubereats-types";

import { users } from "../user/user.schema";


export const customers = pgTable("customers", {
	customer_id: uuid("id").primaryKey().notNull(),
	first_name: text("first_name").notNull(),
    lastname_name: text("last_name").notNull(),
	email: text("email").notNull().unique(),
    phone: text("phone_number").notNull().unique(),
    pasword_hash: text("password").notNull(),
    deliveryAddress: jsonb("delivery_address").$type<DeliveryAddress[]>().notNull(),
    payment_details: jsonb("payment_details").$type<CardDetails[]>(), 
	user_id: uuid("user_id").references(() => users.id).notNull(),
	// preferences 
	// favourite restaurants 
	// favourite menuItems
});

export const customerRelations = relations(customers, ({ one }) => ({
	user: one(users, {
		fields: [customers.user_id],
		references: [users.id]
	})
}));

export type NewCustomerSchema = typeof customers.$inferInsert;
export type CustomerSchema = typeof customers.$inferSelect;