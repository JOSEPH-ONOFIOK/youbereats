import { Router } from "express";
import { emailRouter } from "./features/email/email.routes";

const router = Router();

router.use("/email", emailRouter);

export { router as appRouter };