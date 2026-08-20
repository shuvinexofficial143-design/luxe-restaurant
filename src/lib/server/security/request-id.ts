export function getRequestId(request: Request) {
  return (
    request.headers.get("x-request-id") ||
    `REQ-${crypto.randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase()}`
  );
}
