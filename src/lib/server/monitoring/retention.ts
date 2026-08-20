export const retentionPolicy = {
  securityAuditDays: 365,
  systemErrorDays: 90,
  asyncJobDays: 90,
  notificationDeliveryDays: 180,
  analyticsEventDays: 365,
  privacyRequestDays: 1095,
} as const;

export function retentionSummary() {
  return [
    {
      dataset: "Security audit",
      days: retentionPolicy.securityAuditDays,
    },
    {
      dataset: "System errors",
      days: retentionPolicy.systemErrorDays,
    },
    {
      dataset: "Async jobs",
      days: retentionPolicy.asyncJobDays,
    },
    {
      dataset: "Notification delivery",
      days: retentionPolicy.notificationDeliveryDays,
    },
    {
      dataset: "Analytics events",
      days: retentionPolicy.analyticsEventDays,
    },
    {
      dataset: "Privacy requests",
      days: retentionPolicy.privacyRequestDays,
    },
  ];
}
