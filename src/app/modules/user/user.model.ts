import { model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "./user.interface";
import crypto from "crypto";

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    referralCode: {
      type: String,
      unique: true,
      default: null,
    },
    credits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ----- hash pasword ----- //
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

// ----- Generate a referral code if not present ----- //
userSchema.pre("save", function (next) {
  const randomCode = crypto.randomBytes(2).toString("hex").toUpperCase();
  this.referralCode = `${this.name.split(" ")[0].toUpperCase()}${randomCode}`;
  next();
});
//  ----- check if user exist by email ----- //
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await UserModel.findOne({ email });
};

//  ----- check if user exist by referral code ----- //
userSchema.statics.isUserExistByReferralCode = async function (
  referralCode: string
) {
  return await UserModel.findOne({ referralCode }).select("-password");
};

//  ----- compare password ----- //
userSchema.statics.comparePassword = async function (
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
};

export const UserModel = model<IUser, IUserModel>("User", userSchema);
