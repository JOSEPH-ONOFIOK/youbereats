CREATE TABLE IF NOT EXISTS "menuitems" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"restaurantId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"address" json NOT NULL,
	"location" json DEFAULT '{"location":0,"longitude":0}'::json,
	"phone" text NOT NULL,
	"cusines" json DEFAULT '[]'::json,
	"opening_hours" json DEFAULT '{"monday":{"open":"9:00","close":"18:00"}}'::json,
	"rating" integer DEFAULT 0,
	"image" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "restaurants_name_unique" UNIQUE("name"),
	CONSTRAINT "restaurants_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menuitems" ADD CONSTRAINT "menuitems_restaurantId_restaurants_id_fk" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
