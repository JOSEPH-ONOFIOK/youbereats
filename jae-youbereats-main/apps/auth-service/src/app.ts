import express, { json, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { appRouter } from "./routes";

const app = express();
app
    .use(json({ type: ["application/json"] }))
    .use(morgan("dev"))
    .use("/api", appRouter)
    .use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.log({ error })
        return res.json({ success: false, error })
    })
    

export default app;