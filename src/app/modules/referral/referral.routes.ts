import { Router } from "express";
import { authGuard } from "../../middleware/authGuard";
import { referralController } from "./referral.controller";

export const referralRouter = Router();

referralRouter.get(
  "/referred-users",
  authGuard(),
  referralController.getReferredUsers
);
