import type {
  CRMAudienceFilter,
  CRMCustomerSummary,
} from "./types";

export function customerMatchesAudience(
  customer: CRMCustomerSummary,
  filter: CRMAudienceFilter
) {
  if (
    filter.excludeDoNotContact !== false &&
    customer.profile.do_not_contact
  ) {
    return false;
  }

  if (
    filter.segments?.length &&
    !filter.segments.includes(customer.profile.segment)
  ) {
    return false;
  }

  if (
    typeof filter.minVipScore === "number" &&
    customer.profile.vip_score < filter.minVipScore
  ) {
    return false;
  }

  if (
    typeof filter.minLifetimeValue === "number" &&
    customer.profile.lifetime_value < filter.minLifetimeValue
  ) {
    return false;
  }

  if (
    filter.preferredChannel &&
    customer.profile.preferred_channel !== filter.preferredChannel
  ) {
    return false;
  }

  if (
    filter.tags?.length &&
    !filter.tags.every((tag) =>
      customer.tags.some(
        (item) => item.tag.toLowerCase() === tag.toLowerCase()
      )
    )
  ) {
    return false;
  }

  return true;
}
