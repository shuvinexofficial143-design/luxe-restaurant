export type PasswordPolicyResult = {
  valid: boolean;
  failures: string[];
};

export function evaluatePasswordPolicy(password: string): PasswordPolicyResult {
  const failures: string[] = [];

  if (password.length < 12) failures.push("Use at least 12 characters.");
  if (!/[A-Z]/.test(password)) failures.push("Add an uppercase letter.");
  if (!/[a-z]/.test(password)) failures.push("Add a lowercase letter.");
  if (!/[0-9]/.test(password)) failures.push("Add a number.");
  if (!/[^A-Za-z0-9]/.test(password)) failures.push("Add a symbol.");

  return {
    valid: failures.length === 0,
    failures,
  };
}
