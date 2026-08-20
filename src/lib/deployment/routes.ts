export const productionCriticalRoutes = [
  {
    path: "/",
    label: "Home",
    public: true,
  },
  {
    path: "/menu",
    label: "Menu",
    public: true,
  },
  {
    path: "/reservations/live",
    label: "Live reservations",
    public: true,
  },
  {
    path: "/order/live",
    label: "Live ordering",
    public: true,
  },
  {
    path: "/auth/login",
    label: "Customer login",
    public: true,
  },
  {
    path: "/account/secure",
    label: "Customer account",
    public: false,
  },
  {
    path: "/admin/login",
    label: "Admin login",
    public: true,
  },
  {
    path: "/admin",
    label: "Admin dashboard",
    public: false,
  },
  {
    path: "/api/health/live",
    label: "Liveness",
    public: true,
  },
  {
    path: "/api/health/readiness",
    label: "Readiness",
    public: true,
  },
] as const;
