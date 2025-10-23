import { Model } from "mongoose";
import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  referralCode?: string;
  credits?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  referredCode?: string;
}

export interface IUserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser | null>;
  isUserExistByReferralCode(referralCode: string): Promise<IUser | null>;
}
