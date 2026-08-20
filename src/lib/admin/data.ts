import type { AdminNavItem, AdminSection } from "./types";

export const adminNav: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: "◈" },
  { label: "Deployment", href: "/admin/deployment", icon: "✓" },
  { label: "CRM", href: "/admin/crm", icon: "◎" },
  { label: "Analytics", href: "/admin/analytics", icon: "↗" },
  { label: "Billing", href: "/admin/billing", icon: "₹" },
  { label: "Communications", href: "/admin/communications", icon: "✉" },
  { label: "SEO", href: "/admin/seo", icon: "⌕" },
  { label: "Monitoring", href: "/admin/monitoring", icon: "◌" },
  { label: "Privacy", href: "/admin/privacy", icon: "⊙" },
  { label: "Operations", href: "/admin/operations", icon: "⟳" },
  { label: "Languages", href: "/admin/i18n", icon: "文" },
  { label: "Database", href: "/admin/database", icon: "◉" },
  { label: "Backend", href: "/admin/backend", icon: "◇" },
  { label: "Integrations", href: "/admin/integrations", icon: "∞" },
  { label: "Reservation Engine", href: "/admin/reservation-engine", icon: "⌾" },
  { label: "Kitchen KDS", href: "/admin/kitchen", icon: "▦" },
  { label: "CMS", href: "/admin/cms", icon: "✎" },
  { label: "Reservations", href: "/admin/reservations", icon: "◷" },
  { label: "Orders", href: "/admin/orders", icon: "▣" },
  { label: "Events", href: "/admin/events", icon: "🎟" },
  { label: "Private Dining", href: "/admin/private-dining", icon: "♢" },
  { label: "Reviews", href: "/admin/reviews", icon: "★" },
  { label: "Gift Cards", href: "/admin/gifts", icon: "🎁" },
  { label: "Careers", href: "/admin/careers", icon: "⌁" },
  { label: "Users", href: "/admin/users", icon: "◌" },
  { label: "Roles", href: "/admin/roles", icon: "⌘" },
  { label: "Security", href: "/admin/security", icon: "◆" },
  { label: "Sessions", href: "/admin/sessions", icon: "◍" },
];

export const storageKeys: Record<AdminSection, string> = {
  reservations: "luxe-reservations-v1",
  orders: "luxe-orders-v1",
  events: "luxe-event-bookings-v1",
  privateDining: "luxe-private-dining-inquiries-v1",
  reviews: "luxe-reviews-v1",
  gifts: "luxe-gift-purchases-v1",
  careers: "luxe-career-applications-v1",
};

export const adminStatusOptions: Partial<Record<AdminSection, string[]>> = {
  reservations: ["CONFIRMED","PENDING_DEPOSIT","CANCELLED","WAITLISTED"],
  orders: ["RECEIVED","CONFIRMED","PREPARING","READY","COMPLETED","CANCELLED"],
  events: ["CONFIRMED","WAITLISTED"],
  privateDining: ["ENQUIRY_RECEIVED","IN_REVIEW","CONTACTED","CONFIRMED","CLOSED"],
  gifts: ["ACTIVE","USED","CANCELLED"],
  careers: ["RECEIVED","REVIEW","INTERVIEW","OFFER","CLOSED"],
};

export const demoAdminNotes = [
  "Final deployment readiness separates configuration from actual build success.",
  "Vercel cron is wired to an authenticated GET route but still needs deployment verification.",
  "Public readiness exposes aggregate status only; detailed checks remain admin-authenticated.",
  "Feature development is complete after Batch 48; final lint/type/build repair is still required.",
];
