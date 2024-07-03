import { Router } from "express";

import { MenuItemController } from "../controllers/menuItem";
import { authorizeRole } from "../middleware/rbac/authorization";
import { MenuItemRepository } from "../repository/MenuItemRepository";
import { catchAsyncErrors } from "../utils/helpers";


const router = Router();
const menuItemController = new MenuItemController(new MenuItemRepository());

router.get("/:menuItemId", catchAsyncErrors(menuItemController.getById));

router.get("/", catchAsyncErrors(menuItemController.getMany));

router.post("/",
    // authorizeRole, 
    catchAsyncErrors(menuItemController.create)
);

router.put(
    "/", 
    authorizeRole, 
    catchAsyncErrors(menuItemController.update)
);

router.delete(
    "/:menuItemId", 
    authorizeRole, 
    catchAsyncErrors(menuItemController.delete)
);

export default router;