import status from "http-status";
import AppError from "../../errorHandlers/appError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { ReferralModel } from "../referral/referral.model";
import { Types } from "mongoose";

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

export const userService = {
  registerUser,
};
