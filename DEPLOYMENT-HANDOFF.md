# LUXE Restaurant — Final Deployment Handoff

Batch 48 closes the normal feature-development phase.

## Do not call the project production-ready yet

Production readiness requires all of the following to be independently verified:

1. `npm.cmd run lint`
2. `npx.cmd tsc --noEmit`
3. `npm.cmd run build`
4. Required Supabase migrations applied through `015_monitoring_privacy`
5. Production environment variables configured in Vercel
6. First admin OWNER bootstrapped once
7. `LUXE_ADMIN_BOOTSTRAP_SECRET` rotated/removed after bootstrap
8. Razorpay webhook registered and verified
9. WhatsApp webhook registered and verified
10. Resend sending domain/provider configuration verified
11. `/api/cron/jobs` schedule verified on the actual Vercel deployment
12. Live HTTP smoke tests pass

## Local final audit

PowerShell:

    npm.cmd run lint; if($LASTEXITCODE -eq 0){ npx.cmd tsc --noEmit }; if($LASTEXITCODE -eq 0){ npm.cmd run build }

Optional scripts after compilation is repaired:

    node scripts/luxe-route-audit.mjs
    node scripts/luxe-migration-audit.mjs
    node scripts/luxe-secret-scan.mjs

After the application is running:

    node scripts/luxe-http-smoke.mjs

Set `LUXE_SMOKE_URL` to test a deployed URL.

## Cron

`vercel.json` calls `/api/cron/jobs` hourly.

The endpoint requires:

- `CRON_SECRET`, or
- `LUXE_JOB_RUNNER_SECRET` when manually calling it with the matching Bearer token.

A config file does not prove that a particular Vercel plan executed the cron. Verify the deployed logs.

## Backups

The application includes sanitized JSON export tools.

They are NOT a substitute for:

- Supabase/provider backups
- point-in-time recovery
- offsite backups
- tested disaster recovery

## Final status

Normal feature batches: complete.

Next task: consolidated compile/build repair.
