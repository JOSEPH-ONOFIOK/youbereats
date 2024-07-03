import { Router } from "express";

import { restaurantController } from "../controllers/restaurant";
import { validateUUID, validationPipe } from "../middleware/validations/pipes";
import { authorizeRole } from "../middleware/rbac/authorization";

const router = Router();

router.get("/:id", validateUUID, restaurantController.getById);

router.get("", restaurantController.getMany);

router.post(
    "",
    // authorizeRole, 
    validationPipe, 
    restaurantController.create
);

router.put(
    "/:id", 
    // authorizeRole, 
    validationPipe,
    restaurantController.update
);

router.delete("/:id", validateUUID, restaurantController.delete);

export default router;