import { Types } from "mongoose";

export interface IReferral {
  _id?: Types.ObjectId;
  referrerId: Types.ObjectId;
  referredId: Types.ObjectId;
  status: 'pending' | 'completed';
}
