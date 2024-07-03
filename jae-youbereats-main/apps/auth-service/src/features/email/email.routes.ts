import { Router } from "express";
import { EmailController } from "./email.controller";

const router = Router();

// const emailService = new EmailController();

// router.post("/validate", emailService.validateEmail);  

// router.put("/update", emailService.updateEmail);

export { router as emailRouter };