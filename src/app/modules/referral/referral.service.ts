import QueryBuilder from "../../builder/queryBuilder";
import { ReferralModel } from "./referral.model";

const getReferredUsers = async (
  userId: string,
  queries: Record<string, unknown>
) => {
  const referralQuery = new QueryBuilder(
    ReferralModel.find({ referrerId: userId }),
    queries
  )
    .filter()
    .sort()
    .paginate()
    .populate([{ path: "referredId", select: "name" }]);

  const result = await referralQuery.queryModel;

  // ---- Additional counts ---- //
  const totalCountPromise = ReferralModel.countDocuments({
    referrerId: userId,
  });

  const pendingCountPromise = ReferralModel.countDocuments({
    referrerId: userId,
    status: "pending",
  });

  const completedCountPromise = ReferralModel.countDocuments({
    referrerId: userId,
    status: "completed",
  });

  // Run all counts in parallel (faster)
  const [totalCount, pendingCount, completedCount] = await Promise.all([
    totalCountPromise,
    pendingCountPromise,
    completedCountPromise,
  ]);

  return {
    metadata: {
      totalCount,
      pendingCount,
      completedCount,
      page: Number(queries.page) || 1,
    },
    data: result,
  };
};

export const referralService = {
  getReferredUsers,
};
