import { serial, text, timestamp, pgTable, json, integer, decimal, uuid } from "drizzle-orm/pg-core";
import { RestaurantAddress, RestaurantLocation, Cusine, OpeningHours } from "../entities/restaurant";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const restaurant = pgTable("restaurant", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  address: json("address").notNull().$type<RestaurantAddress>(),
  location: json("location").default({ location: 0.0, longitude: 0.0 }).$type<RestaurantLocation>(),
  phone: text("phone").notNull().unique(),
  cuisines: json("cusines").default([]).$type<Cusine[]>(),
  opening_hours: json("opening_hours").default({ monday: { open: "9:00", close: "18:00"}}).$type<OpeningHours>(),
  rating: integer("rating").default(0),
  image: text("image").notNull(), 
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type RestaurantSchema = typeof restaurant.$inferSelect;
export type NewRestaurantSchema = typeof restaurant.$inferInsert;

export const selectRestaurantSchema = createSelectSchema(restaurant);

const cusines = ["african", "nigerian", "italian"];

const zodTimeTransformer = z.custom((value) => {
  if (typeof value !== "string") throw new Error("invalid type");
  const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/; 
  
  if (!timeRegex.test(value)) {
    throw new Error("Invalid 24-hour time format");
  }

  const [hours, minutes] = value.split(":").map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid hours or minutes");
  }

  return new Date(`2000-01-01T${value}:00Z`);
});

export const insertRestaurantSchema = createInsertSchema(restaurant, {
  name: (schema) => schema.name.nonempty().trim().min(3),
  address: z.object({
    streetName: z.string(),
    number: z.string(),
    postalCode: z.string()
  }),
  location: z.object({
    longitude: z.string(),
    latitude: z.string()
  }),
  phone: (schema) => schema.phone.min(10).max(11),
  cuisines: z.array(z.enum(["african", "nigerian", "italian"])),
  opening_hours: z.object({
    open: z.string(),
    close: z.string()
  })
  // image: (schema) => schema.image.
});
