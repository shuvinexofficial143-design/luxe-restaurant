"use client";

let cachedCsrf = "";

async function csrfToken() {
  if (cachedCsrf) return cachedCsrf;

  const response = await fetch("/api/v1/security/csrf", {
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    data?: { token?: string };
  };

  cachedCsrf = payload.data?.token || "";

  if (!cachedCsrf) {
    throw new Error("CSRF token could not be created.");
  }

  return cachedCsrf;
}

export async function adminFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
) {
  const method = (init.method || "GET").toUpperCase();
  const headers = new Headers(init.headers);

  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    headers.set("x-csrf-token", await csrfToken());
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 403 && method !== "GET") {
    cachedCsrf = "";
  }

  return response;
}
