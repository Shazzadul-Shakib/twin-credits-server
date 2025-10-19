import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { status } from "http-status";
import { productService } from "./product.service";

// ----- get all products controller ----- //
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAllProducts();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

export const productController = {
  getAllProducts,
};
