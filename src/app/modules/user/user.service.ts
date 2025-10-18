import status from "http-status";
import AppError from "../../errorHandlers/appError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { ReferralModel } from "../referral/referral.model";
import { Types } from "mongoose";
import { createToken } from "../../utils/createToken";
import config from "../../config";

// ----- user register service ----- //
const registerUser = async (user: IUser) => {
  let referrerId: Types.ObjectId | null = null;

  // check if user exist by email
  const isUserExist = await UserModel.isUserExistByEmail(user.email);
  if (isUserExist) {
    throw new AppError(
      status.BAD_REQUEST,
      "User already exist with this email!"
    );
  }

  // check if referred user exist by referralCode
  if (user.referredCode) {
    const isReferredUserExist = await UserModel.isUserExistByReferralCode(
      user.referredCode
    );
    if (!isReferredUserExist) {
      throw new AppError(status.BAD_REQUEST, "Invalid referral code!");
    }
    referrerId = isReferredUserExist._id;
  }

  const result = await UserModel.create(user);

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
  const isPasswordMatched = await UserModel.comparePassword(
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



export const userService = {
  registerUser,
  loginUser,
};
