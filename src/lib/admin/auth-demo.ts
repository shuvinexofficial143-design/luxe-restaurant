const KEY = "luxe-admin-demo-session-v1";

export const demoAdminSession = {
  isActive() {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(KEY) === "active";
  },

  open() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, "active");
    }
  },

  close() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KEY);
    }
  },
};
