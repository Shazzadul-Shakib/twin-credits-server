import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = model<IOrder>("Order", OrderSchema);
