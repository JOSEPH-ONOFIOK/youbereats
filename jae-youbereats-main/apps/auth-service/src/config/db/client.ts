import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";


const dbClient = new Client({
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT as string),
    user: process.env.DATABASE_USER as string,
    database:  process.env.DATABASE_NAME as string
});

const db = drizzle(dbClient);

export { dbClient, db };