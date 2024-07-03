import express, { Request, Response, NextFunction, json } from "express";
import routes from "./routes";
import morgan from "morgan";


const app = express();
app
    .use(json({ type: ["application/json"] }))
    .use(morgan("dev"))
    .use("/api", routes)
    .use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.log({ error })
        return res.json({ success: false, error })
    })

export { app };