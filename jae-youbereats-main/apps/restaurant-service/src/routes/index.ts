import { Router } from "express";

import restaurantRoutes from "./restaurant";
import menuItemRoutes from "./menuItem";

const router = Router();

router.use("/restaurant", restaurantRoutes);
router.use("/menu-item", menuItemRoutes);

export default router;
