export type ServerEnvironment = {
  databaseUrl: string;
  appUrl: string;
  sessionSecret: string;
};

export function getServerEnvironment(): ServerEnvironment {
  return {
    databaseUrl: process.env.DATABASE_URL || "",
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    sessionSecret: process.env.LUXE_SESSION_SECRET || "",
  };
}

export function backendEnvironmentStatus() {
  const env = getServerEnvironment();

  return {
    databaseConfigured: Boolean(env.databaseUrl),
    sessionSecretConfigured: env.sessionSecret.length >= 32,
    appUrlConfigured: Boolean(env.appUrl),
  };
}
