import {
  SupabaseRepository,
} from "./repository";
import type {
  CustomerProfileRow,
} from "@/lib/server/account/types";

export class SupabaseCustomerProfileRepository extends SupabaseRepository<CustomerProfileRow> {
  constructor() {
    super(
      "customer_profiles",
      "customer_id"
    );
  }

  async findByCustomerId(
    customerId: string
  ) {
    return this.findById(
      customerId
    );
  }
}

export const supabaseCustomerProfiles =
  new SupabaseCustomerProfileRepository();
