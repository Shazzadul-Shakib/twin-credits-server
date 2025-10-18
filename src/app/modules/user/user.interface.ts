import { Model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  referralCode: string;
  referredCode?: string;
  credits: number;
}
export interface IUserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser>;
  isUserExistByReferralCode(referralCode: string): Promise<IUser>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
