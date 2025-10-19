import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { status } from "http-status";
import { orderService } from "./order.service";

// ----- create order controller ----- //
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await orderService.createOrder({
    userId,
    ...req.body,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
};
