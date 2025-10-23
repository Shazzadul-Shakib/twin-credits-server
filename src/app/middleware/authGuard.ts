import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errorHandlers/appError";
import { status } from "http-status";
import { UserModel } from "../modules/user/user.model";

export const authGuard = () => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      let token: string | undefined;

      if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
        console.log("Token from cookie:", token);
      } else if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        console.log("Token from Authorization header:", token);
      }

      if (!token) {
        console.log("No token found in cookies or headers");
        throw new AppError(status.UNAUTHORIZED, "Unauthorized access!");
      }

      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          token,
          config.jwt_access_secret as string
        ) as JwtPayload;
      } catch (error) {
        console.error("Token verification failed:", error);
        throw new AppError(status.UNAUTHORIZED, "Invalid or expired token!");
      }

      const { email } = decoded;

      const user = await UserModel.isUserExistByEmail(email);
      if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};
