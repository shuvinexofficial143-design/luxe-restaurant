import { serverIds } from "@/lib/server/db/ids";
import { ApiError } from "@/lib/server/api/errors";
import { supabaseCustomerProfiles } from "@/lib/server/supabase/customer-profiles";
import { supabaseCustomerOccasions } from "@/lib/server/supabase/customer-occasions";
import { supabaseSavedDishes } from "@/lib/server/supabase/customer-saved-dishes";
import {
  supabaseLoyaltyTransactions,
  supabaseLoyaltyWallets,
} from "@/lib/server/supabase/loyalty";
import type {
  AccountDashboardPayload,
  CustomerProfileRow,
  LoyaltyWalletRow,
} from "./types";
import { canRedeem, loyaltyRewards, loyaltyTier } from "./loyalty";

export async function ensureCustomerProfile(
  customerId: string
): Promise<CustomerProfileRow> {
  const existing =
    await supabaseCustomerProfiles.findByCustomerId(customerId);

  if (existing) return existing;

  return supabaseCustomerProfiles.insert({
    customer_id: customerId,
    favourite_area: null,
    dietary_preferences: [],
    favourite_cuisines: [],
    marketing_opt_in: false,
    notes: null,
  });
}

export async function ensureLoyaltyWallet(
  customerId: string
): Promise<LoyaltyWalletRow> {
  const existing =
    await supabaseLoyaltyWallets.findForCustomer(customerId);

  if (existing) return existing;

  return supabaseLoyaltyWallets.insert({
    customer_id: customerId,
    points_balance: 0,
    lifetime_points: 0,
    tier: "EMBER",
  });
}

export async function getAccountDashboard(
  customerId: string
): Promise<AccountDashboardPayload> {
  const [profile, occasions, savedDishes, loyalty, loyaltyHistory] =
    await Promise.all([
      ensureCustomerProfile(customerId),
      supabaseCustomerOccasions.listForCustomer(customerId),
      supabaseSavedDishes.listForCustomer(customerId),
      ensureLoyaltyWallet(customerId),
      supabaseLoyaltyTransactions.listForCustomer(customerId),
    ]);

  return {
    profile,
    occasions,
    savedDishes,
    loyalty,
    loyaltyHistory,
  };
}

export async function redeemLoyaltyReward(
  customerId: string,
  rewardId: string
) {
  const reward = loyaltyRewards.find((item) => item.id === rewardId);

  if (!reward) {
    throw new ApiError(
      "REWARD_NOT_FOUND",
      "Selected loyalty reward does not exist.",
      404
    );
  }

  const wallet = await ensureLoyaltyWallet(customerId);

  if (!canRedeem(wallet.points_balance, reward.points)) {
    throw new ApiError(
      "INSUFFICIENT_POINTS",
      "You do not have enough loyalty points for this reward.",
      422
    );
  }

  const nextBalance = wallet.points_balance - reward.points;

  await supabaseLoyaltyWallets.patch(customerId, {
    points_balance: nextBalance,
    tier: loyaltyTier(wallet.lifetime_points),
    updated_at: new Date().toISOString(),
  });

  const transaction = await supabaseLoyaltyTransactions.insert({
    id: serverIds.audit(),
    customer_id: customerId,
    transaction_type: "REDEEM",
    points: -reward.points,
    source: "LOYALTY_REWARD",
    reference_id: reward.id,
    description: `Redeemed ${reward.title}`,
  });

  return {
    reward,
    balance: nextBalance,
    transaction,
  };
}
