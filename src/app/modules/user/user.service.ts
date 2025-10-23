import status from "http-status";
import AppError from "../../errorHandlers/appError";
import { IUser, IUserRegister } from "./user.interface";
import { UserModel } from "./user.model";
import { ReferralModel } from "../referral/referral.model";
import { Types } from "mongoose";
import { createToken } from "../../utils/createToken";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

// ----- user register service ----- //
const registerUser = async (userData: IUserRegister) => {
  let referrerId: Types.ObjectId | null = null;

  // check if user exist by email
  const isUserExist = await UserModel.isUserExistByEmail(userData.email);
  if (isUserExist) {
    throw new AppError(
      status.BAD_REQUEST,
      "User already exist with this email!"
    );
  }

  // check if referred user exist by referralCode
  if (userData.referredCode) {
    const isReferredUserExist = await UserModel.isUserExistByReferralCode(
      userData.referredCode
    );
    if (!isReferredUserExist) {
      throw new AppError(status.BAD_REQUEST, "Invalid referral code!");
    }
    referrerId = isReferredUserExist._id!;
  }

  // ⭐ Only pass fields that exist in schema
  const result = await UserModel.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  // ----- create referral if there's a valid referrer ----- //
  if (referrerId) {
    await ReferralModel.create({
      referrerId,
      referredId: result._id,
    });
  }

  return result;
};

// ----- user login service ----- //
const loginUser = async (user: IUser) => {
  const isUserExist = await UserModel.isUserExistByEmail(user.email);

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(
    user.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(status.UNAUTHORIZED, "Invalid password!");
  }

  // ----- create token ----- //
  const accessToken = createToken(
    {
      email: isUserExist.email,
      userId: isUserExist._id,
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    {
      email: isUserExist.email,
    },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

// ----- refresh token service ----- //
const refreshToken = async (refreshToken: string) => {
  // verify refresh token
  const decoded = jwt.verify(
    refreshToken,
    config.jwt_refresh_secret as string
  ) as JwtPayload;
  if (!decoded) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token!");
  }
  // check if user exist
  const isUserExist = await UserModel.isUserExistByEmail(decoded.email);
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }
  // create new access token
  const accessToken = createToken(
    {
      email: isUserExist.email,
      userId: isUserExist._id,
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return { accessToken };
};

// ----- get logged user service ----- //
const getLoggedUser = async (userId: Types.ObjectId) => {
  // ----- check if user exist by id ----- //
  const isUserExist = await UserModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }
  // ----- get logged user info ----- //
  const result = await UserModel.findById(userId).select(
    "name _id email credits referralCode"
  );

  return result;
};

export const userService = {
  registerUser,
  loginUser,
  refreshToken,
  getLoggedUser,
};
