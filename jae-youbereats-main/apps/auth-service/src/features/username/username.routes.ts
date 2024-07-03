import { Router } from "express";
import { UsernameController } from "./username.controller";

const router = Router();
// const usernameController = new UsernameController()

router.post("/validate")

export { router as UsernameRouter };