export const productionChecklist = [
  {
    group: "Database",
    item: "Apply every migration through 015_monitoring_privacy.",
  },
  {
    group: "Security",
    item: "Bootstrap the first OWNER once, then rotate/remove LUXE_ADMIN_BOOTSTRAP_SECRET.",
  },
  {
    group: "Security",
    item: "Verify admin/customer cookies are Secure in the production HTTPS deployment.",
  },
  {
    group: "Payments",
    item: "Configure Razorpay live/test credentials intentionally and register the verified webhook URL.",
  },
  {
    group: "Messaging",
    item: "Configure Resend sending domain and WhatsApp Cloud API credentials before claiming delivery.",
  },
  {
    group: "Jobs",
    item: "Set CRON_SECRET and verify /api/cron/jobs executes on the chosen deployment plan.",
  },
  {
    group: "SEO",
    item: "Replace the example public URL with the real production domain.",
  },
  {
    group: "Monitoring",
    item: "Check /api/health/live and authenticated deep health after deployment.",
  },
  {
    group: "Quality",
    item: "Run lint, TypeScript, production build and HTTP smoke tests.",
  },
  {
    group: "Recovery",
    item: "Configure real provider/database backups; the in-app JSON export is not PITR.",
  },
] as const;
