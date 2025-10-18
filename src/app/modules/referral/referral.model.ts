import { Schema, model } from "mongoose";
import { IReferral } from "./referral.interface";

const referralSchema = new Schema<IReferral>(
  {
    referrerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referredId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const ReferralModel = model<IReferral>("Referral", referralSchema);
