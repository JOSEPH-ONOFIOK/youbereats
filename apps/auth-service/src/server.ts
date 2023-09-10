import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";



const PORT = Number(process.env.PORT || 1018);

(async () => {
    try {
        // await dbClient.connect();
        // console.log("Database Connected.");
    
        // await migrate(drizzle(dbClient), { migrationsFolder: "migrations"});
        // console.log("Migration Successful.");
     
        app.listen(PORT, () => {
            console.log(`${process.env.SERVICE_NAME} running on ${PORT}`);
        });
    } catch (error) {
        console.log(`SERVER INIT ERROR: ${error}`);
    }
})(); 
