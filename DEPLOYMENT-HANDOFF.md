# LUXE Restaurant — Production Handoff

The normal feature-development phase is complete.

## Code verification status

The production-readiness branch now verifies all of the following in GitHub Actions:

1. Production dependency security audit
2. ESLint
3. TypeScript typecheck
4. Critical route audit
5. Migration-file audit
6. Repository secret scan
7. Next.js production build

The application must still NOT be called fully production-ready until the external production services below are configured and verified.

## Remaining launch requirements

1. Apply Supabase migrations through `015_monitoring_privacy`.
2. Configure all required production environment variables.
3. Bootstrap the first admin OWNER once.
4. Rotate/remove `LUXE_ADMIN_BOOTSTRAP_SECRET` after bootstrap.
5. Register and verify the Razorpay webhook.
6. Register and verify the WhatsApp webhook.
7. Verify the Resend sending domain and sender address.
8. Verify `/api/cron/jobs` actually executes on the deployed Vercel plan.
9. Run live HTTP smoke tests against the deployed URL.
10. Configure real Supabase/provider backups and test recovery.

## Local code audit

Run:

    npm run audit:production

This checks dependencies, lint, TypeScript, routes, migration files, repository secrets and the production build.

To validate the production environment separately, run:

    npm run audit:env

## Cron

`vercel.json` calls `/api/cron/jobs` hourly.

The endpoint requires:

- `CRON_SECRET`, or
- `LUXE_JOB_RUNNER_SECRET` for an explicitly authorized manual call.

A cron configuration file alone does not prove execution. Verify deployed logs.

## Live smoke tests

After deployment:

    node scripts/luxe-http-smoke.mjs

Set `LUXE_SMOKE_URL` to the deployed application URL before running the script.

## Backups

The application includes sanitized JSON export tools, but they are not a replacement for:

- Supabase/provider backups
- point-in-time recovery
- offsite backups
- tested disaster recovery

## Current status

Code-level production checks are automated and passing on the production-readiness branch.

Remaining work is external service configuration, database migration application, OWNER bootstrap and live deployment verification.
