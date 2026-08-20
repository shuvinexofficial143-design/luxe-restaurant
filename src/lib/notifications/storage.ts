import { seedNotifications } from "./data";
import { defaultSubscriptionPreferences } from "./preferences";
import type {
  NotificationItem,
  SubscriptionPreferences,
  SubscriptionRecord,
} from "./types";

const SUB_KEY = "luxe-newsletter-subscription-v1";
const NOTIFICATION_KEY = "luxe-notifications-v1";

const EMPTY_NOTIFICATIONS: NotificationItem[] = [];
const notificationListeners = new Set<() => void>();
let notificationCache: NotificationItem[] | null = null;

export const subscriptionStorage = {
  get(): SubscriptionRecord | null {
    if (typeof window === "undefined") return null;

    try {
      const parsed = JSON.parse(window.localStorage.getItem(SUB_KEY) || "null");
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  },

  subscribe(name: string, email: string) {
    const now = new Date().toISOString();
    const record: SubscriptionRecord = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      name,
      email,
      preferences: defaultSubscriptionPreferences,
      active: true,
      createdAt: now,
      updatedAt: now,
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUB_KEY, JSON.stringify(record));
    }

    return record;
  },

  updatePreferences(preferences: SubscriptionPreferences) {
    const current = this.get();
    if (!current || typeof window === "undefined") return null;

    const next: SubscriptionRecord = {
      ...current,
      preferences,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(SUB_KEY, JSON.stringify(next));
    return next;
  },

  unsubscribe(email: string) {
    const current = this.get();
    if (!current || current.email.toLowerCase() !== email.trim().toLowerCase()) {
      return false;
    }

    const next: SubscriptionRecord = {
      ...current,
      active: false,
      updatedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SUB_KEY, JSON.stringify(next));
    }

    return true;
  },
};

function readNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return EMPTY_NOTIFICATIONS;
  if (notificationCache !== null) return notificationCache;

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(NOTIFICATION_KEY) || "null"
    );
    notificationCache = Array.isArray(parsed) ? parsed : seedNotifications;
  } catch {
    notificationCache = seedNotifications;
  }

  return notificationCache;
}

function writeNotifications(next: NotificationItem[]) {
  notificationCache = next;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(next));
  }

  notificationListeners.forEach((listener) => listener());
}

export const notificationStore = {
  subscribe(listener: () => void) {
    notificationListeners.add(listener);
    return () => notificationListeners.delete(listener);
  },

  getSnapshot() {
    return readNotifications();
  },

  getServerSnapshot() {
    return EMPTY_NOTIFICATIONS;
  },

  markRead(id: string) {
    writeNotifications(
      readNotifications().map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  },

  markAllRead() {
    writeNotifications(
      readNotifications().map((item) => ({ ...item, read: true }))
    );
  },

  reset() {
    writeNotifications(seedNotifications);
  },
};
