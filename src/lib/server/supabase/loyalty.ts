import {
  SupabaseRepository,
} from "./repository";
import type {
  LoyaltyTransactionRow,
  LoyaltyWalletRow,
} from "@/lib/server/account/types";

export class SupabaseLoyaltyWalletRepository extends SupabaseRepository<LoyaltyWalletRow> {
  constructor() {
    super(
      "loyalty_wallets",
      "customer_id"
    );
  }

  async findForCustomer(
    customerId: string
  ) {
    return this.findById(
      customerId
    );
  }
}

export class SupabaseLoyaltyTransactionRepository extends SupabaseRepository<LoyaltyTransactionRow> {
  constructor() {
    super(
      "loyalty_transactions"
    );
  }

  async listForCustomer(
    customerId: string
  ) {
    return this.list({
      limit: 100,
      order:
        "created_at.desc",
      query:
        `customer_id=eq.${encodeURIComponent(
          customerId
        )}`,
    });
  }
}

export const supabaseLoyaltyWallets =
  new SupabaseLoyaltyWalletRepository();

export const supabaseLoyaltyTransactions =
  new SupabaseLoyaltyTransactionRepository();
