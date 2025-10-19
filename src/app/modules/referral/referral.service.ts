import { ReferralModel } from "./referral.model";

const getReferredUsers = async (userId: string) => {
  const result = await ReferralModel.find({ referrerId: userId });
  return result;
};

export const referralService = {
  getReferredUsers,
};
