import type { AccountProfile, PointsEntry, SpecialOccasion } from "./types";
import { tierForPoints } from "./loyalty";

const KEY = "luxe-account-v1";
const listeners = new Set<() => void>();

const EMPTY: AccountProfile = {
  id: "guest",
  name: "",
  email: "",
  phone: "",
  birthday: "",
  city: "",
  joinedAt: "",
  loggedIn: false,
  points: 0,
  membership: "EMBER",
  preferences: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lowSpice: false,
    noNuts: false,
    favouriteArea: "Main Dining",
  },
  occasions: [],
  pointsHistory: [],
};

let cache: AccountProfile | null = null;

function read(): AccountProfile {
  if (typeof window === "undefined") return EMPTY;
  if (cache !== null) return cache;

  let resolved: AccountProfile;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "null");
    resolved =
      parsed && typeof parsed === "object"
        ? { ...EMPTY, ...parsed }
        : { ...EMPTY };
  } catch {
    resolved = { ...EMPTY };
  }

  cache = resolved;
  return resolved;
}

function write(next: AccountProfile) {
  cache = next;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }

  listeners.forEach((listener) => listener());
}

export const accountStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot() {
    return read();
  },

  getServerSnapshot() {
    return EMPTY;
  },

  register(input: { name: string; email: string; phone: string }) {
    const now = new Date().toISOString();
    const welcomeEntry: PointsEntry = {
      id: `PTS-${Date.now()}`,
      label: "Welcome to LUXE",
      points: 250,
      date: now,
    };

    write({
      ...EMPTY,
      id: `GUEST-${Date.now().toString(36).toUpperCase()}`,
      ...input,
      joinedAt: now,
      loggedIn: true,
      points: 250,
      membership: "EMBER",
      pointsHistory: [welcomeEntry],
    });
  },

  login(email: string) {
    const current = read();

    write({
      ...current,
      email: current.email || email,
      name: current.name || "LUXE Guest",
      joinedAt: current.joinedAt || new Date().toISOString(),
      loggedIn: true,
    });
  },

  logout() {
    write({ ...read(), loggedIn: false });
  },

  update(patch: Partial<AccountProfile>) {
    const current = read();
    const points =
      typeof patch.points === "number" ? patch.points : current.points;

    write({
      ...current,
      ...patch,
      points,
      membership: tierForPoints(points),
    });
  },

  addOccasion(occasion: Omit<SpecialOccasion, "id">) {
    const current = read();

    write({
      ...current,
      occasions: [
        ...current.occasions,
        {
          ...occasion,
          id: `OCC-${Date.now().toString(36).toUpperCase()}`,
        },
      ],
    });
  },

  removeOccasion(id: string) {
    const current = read();

    write({
      ...current,
      occasions: current.occasions.filter((item) => item.id !== id),
    });
  },

  redeemReward(label: string, cost: number) {
    const current = read();

    if (current.points < cost) return false;

    const nextPoints = current.points - cost;
    const entry: PointsEntry = {
      id: `PTS-${Date.now()}`,
      label: `Redeemed: ${label}`,
      points: -cost,
      date: new Date().toISOString(),
    };

    write({
      ...current,
      points: nextPoints,
      membership: tierForPoints(nextPoints),
      pointsHistory: [entry, ...current.pointsHistory],
    });

    return true;
  },
};
