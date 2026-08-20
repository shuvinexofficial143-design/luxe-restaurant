export function deploymentVersion() {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    "";

  return sha
    ? sha.slice(0, 12)
    : "local-development";
}

export function deploymentEnvironment() {
  return (
    process.env.VERCEL_ENV ||
    process.env.NODE_ENV ||
    "unknown"
  );
}
