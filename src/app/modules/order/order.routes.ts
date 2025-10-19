import { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { orderController } from "./order.controller";

export const orderRouter = Router();

orderRouter.post("/", authGuard(), orderController.createOrder);
