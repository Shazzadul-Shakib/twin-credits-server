import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { status } from "http-status";
import { referralService } from "./referral.service";

// ----- get referred users controller ----- //
const getReferredUsers = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await referralService.getReferredUsers(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Referred users retrieved successfully",
    data: result,
  });
});

export const referralController = {
  getReferredUsers,
};
