import status from "http-status";
import AppError from "../../errorHandlers/appError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// ----- user register service ----- //
const registerUser = async (user: IUser) => {
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
      throw new AppError(
        status.BAD_REQUEST,
        "Referred user does not exist with this referral code!"
      );
    }
    console.log({isReferredUserExist});
  }

  const result = await UserModel.create(user);
  return result;
};

export const userService = {
  registerUser,
};
