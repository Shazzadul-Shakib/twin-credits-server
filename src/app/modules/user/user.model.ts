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
      select: false,
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
  {
    timestamps: true,
    strict: true,
  }
);

// ----- hash password ----- //
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

// ----- Generate a referral code if not present ----- //
userSchema.pre("save", function (next) {
  if (!this.isNew || this.referralCode) {
    return next();
  }

  const randomCode = crypto.randomBytes(2).toString("hex").toUpperCase();
  this.referralCode = `${this.name.split(" ")[0].toUpperCase()}${randomCode}`;
  next();
});

//  ----- check if user exist by email ----- //
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};

//  ----- check if user exist by referral code ----- //
userSchema.statics.isUserExistByReferralCode = async function (
  referralCode: string
) {
  return await UserModel.findOne({ referralCode });
};

export const UserModel = model<IUser, IUserModel>("User", userSchema);
