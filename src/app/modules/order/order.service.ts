import mongoose from "mongoose";
import { ReferralModel } from "../referral/referral.model";
import { UserModel } from "../user/user.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "../product/product.model";
import AppError from "../../errorHandlers/appError";
import status from "http-status";
import { TOrder } from "./order.interface";


// ----- create order service ----- //
const createOrder = async (orderData: TOrder) => {
  const { userId, product } = orderData;

  const session = await mongoose.startSession();

  return await session.withTransaction(async () => {
    // ----- check if user is referred by someone ----- //
    const isReferred = await ReferralModel.findOne({
      referredId: userId,
    }).session(session);

    // ----- if referred and status is pending, complete referral and add credits ----- //
    if (isReferred && isReferred.status === "pending") {
      const referrerId = isReferred.referrerId;

      isReferred.status = "completed";
      await isReferred.save({ session });

      const referrer = await UserModel.findById(referrerId).session(session);
      if (referrer) {
        referrer.credits += 2;
        await referrer.save({ session });
      }

      const referred = await UserModel.findById(userId).session(session);
      if (referred) {
        referred.credits += 2;
        await referred.save({ session });
      }
    }

    // ----- decrement product quantity (atomic check + update) ----- //
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: product, stock: { $gt: 0 } },
      { $inc: { stock: -1 } },
      { session, new: true }
    );

    if (!updatedProduct) {
      throw new AppError(status.NOT_FOUND, "Product not found or out of stock");
    }

    // ----- create order ----- //
    const result = await OrderModel.create(
      [
        {
          userId,
          product,
        },
      ],
      { session }
    );

    return result[0];
  });
};

export const orderService = {
  createOrder,
};
