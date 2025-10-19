import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidations } from "./user.validation";
import { authGuard } from "../../middleware/authGuard";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest({ body: UserValidations.userValidationSchema }),
  userController.registerUser
);
userRouter.post(
  "/login",
  validateRequest({ body: UserValidations.userLoginValidatinSchema }),
  userController.loginUser
);
userRouter.post("/refresh-token", userController.refreshToken);
userRouter.get("/logged-user", authGuard(), userController.getLoggedUser);
userRouter.post("/logout", authGuard(), userController.logoutUser);
