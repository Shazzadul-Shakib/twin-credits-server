import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { status } from "http-status";
import { userService } from "./user.service";
import config from "../../config";

// ----- user register controller ----- //
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.registerUser(user);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// ----- user login controller ----- //
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.loginUser(user);

  // ----- set refresh token in cookie ----- //
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: config.node_env === "production",
    secure: true,
    sameSite: config.node_env === "production" ? "none" : "lax",
  });

  // ----- set access token in cookie ----- //
  res.cookie("accessToken", result.accessToken, {
    httpOnly: config.node_env === "production",
    secure: true,
    sameSite: config.node_env === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
  });
});

// ----- user refresh token controller ----- //
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await userService.refreshToken(refreshToken);

  // ----- set access token in cookie ----- //
  res.cookie("accessToken", result.accessToken, {
    httpOnly: config.node_env === "production",
    secure: true,
    sameSite: config.node_env === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "New Access token set successfully",
  });
});

// ----- user get logged user controller ----- //
const getLoggedUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await userService.getLoggedUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User retrived successfully",
    data: result,
  });
});

// ----- logout user controller ----- //
const logoutUser = catchAsync(async (req: Request, res: Response) => {
  // Clear access and refresh token cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged out successfully",
  });
});



export const userController = {
  registerUser,
  loginUser,
  refreshToken,
  getLoggedUser,
  logoutUser,
};
