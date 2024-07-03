import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";


const dbClient = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "mac",
    password: "1234",
    database: "restaurant"
});

const db = drizzle(dbClient);

export { dbClient, db };
