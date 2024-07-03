import { jsonb, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { CardDetails, UserRoles } from "ubereats-types";


export const userRoles = pgEnum("user_role", [UserRoles.Customer, UserRoles.Rider, UserRoles.Vendor]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey(),
    first_name: text("first_name").notNull(),
    lastname_name: text("last_name").notNull(),
	email: text("email").notNull().unique(),
    phone: text("phone_number").notNull().unique(),
    pasword_hash: text("password").notNull(),
    payment_details: jsonb("payment_details").$type<CardDetails[]>(), 
    role: userRoles("user_role").notNull().$type<UserRoles>().default(UserRoles.Customer)
});

export type UserSchema = typeof users.$inferSelect;
export type NewUserSchema = typeof users.$inferInsert;