import type { Config } from "drizzle-kit";

console.log("HOST ", process.env.DATABASE_HOST)

export default {
    schema: [
        "./src/domains/customer/customer.schema.ts",
        "./src/domains/user/user.schema.ts"
    ],
    driver: "pg",
    dbCredentials: {
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT as string),
        database: process.env.DATABASE_NAME as string
    },
    out: "./migrations"
} satisfies Config;