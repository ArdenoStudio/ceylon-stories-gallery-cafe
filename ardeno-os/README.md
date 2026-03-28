# Ardeno OS — MiroFish x Sentient Agency v4.4

A 100% serverless, zero-maintenance AI agency operating system built on Next.js 15 + Vercel. Powers Ardeno Studio's autonomous agents across 9 departments — running entirely on a free-tier multi-provider LLM infrastructure.

---

## What is MiroFish?

**MiroFish** is the brand name for the Sentient Core Engine embedded in Ardeno OS. It initialises and coordinates agents, generates the real-time Sentient Stream, and routes all LLM calls through the free-tier key pool (90–150+ independent API keys across Gemini, Groq, DeepSeek, Mistral, Cerebras).

---

## Architecture

```
Client Request / Cron Trigger
         │
         ▼
  Next.js 15 App Router (Vercel Serverless)
         │
         ├── /api/agents/queue        ← QStash Worker (AgencyEngine)
         ├── /api/cron/*              ← 8 scheduled background jobs
         ├── /api/webhooks/discord    ← Human-in-the-loop approvals
         └── /api/demo/create         ← Autonomous demo pipeline
         │
         ▼
   Engine Layer (src/engine/ — 62 modules)
         │
         ├── LLMKeyPool + KeyRotator  ← Free-tier key orchestration
         ├── OrchestrationGraph       ← State machine (QStash + Supabase checkpoints)
         ├── SubAgentDispatcher       ← Parallel sub-agent spawning
         ├── CriticAgent              ← LLM-as-Judge quality evaluation
         ├── MemoryManager            ← pgvector semantic memory
         └── ObservabilityTracer      ← OpenTelemetry-style tracing
         │
         ▼
   Supabase (PostgreSQL + pgvector + Realtime)
   Upstash  (QStash job queue + Redis cache)
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

Required env vars:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `QSTASH_TOKEN` | Upstash QStash token |
| `QSTASH_CURRENT_SIGNING_KEY` | QStash signing key |
| `QSTASH_NEXT_SIGNING_KEY` | QStash next signing key |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token |
| `AES_MASTER_KEY` | AES-256 master key for key vault decryption |
| `KEYS_ENC_VAULT` | Base64-encoded encrypted API key vault |
| `DISCORD_WEBHOOK_URL` | Discord webhook for agency alerts |
| `DISCORD_BOT_TOKEN` | Discord bot token (for interactive approval buttons) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `GMAIL_CLIENT_ID` | Gmail OAuth client ID |
| `GMAIL_CLIENT_SECRET` | Gmail OAuth client secret |
| `GMAIL_REFRESH_TOKEN` | Gmail OAuth refresh token |
| `VERCEL_URL` | Your deployment URL (auto-set on Vercel) |
| `CRON_SECRET` | Secret header for cron route authentication |

### 3. Run database migrations
```bash
npx tsx scripts/run-migrations.ts
```
Or apply `supabase/combined-migration.sql` directly in the Supabase SQL editor.

### 4. Encrypt your API keys
Collect keys from Gemini, Groq, DeepSeek, Mistral, Cerebras, then:
```bash
npx tsx scripts/key-encrypt.ts <your-master-key-phrase>
```
Copy the output vault string into `KEYS_ENC_VAULT` in `.env.local` and in the Vercel dashboard.

### 5. Start dev server
```bash
npm run dev
```
Visit `http://localhost:3000/dashboard`

---

## Dashboard

| Route | Description |
|-------|-------------|
| `/dashboard` | Sentient Stream — live agent activity feed |
| `/dashboard/health` | LLM key pool health + quota runway |
| `/dashboard/components` | Component Market Index + trend scores |
| `/dashboard/tenants` | White-label tenant management |
| `/dashboard/marketplace` | Skill marketplace |
| `/dashboard/analytics` | Live ROI metrics |
| `/portal/[id]/interview` | Client requirement interview portal |

---

## Testing

```bash
# Run all tests
npm run test:all

# Infrastructure only (Supabase, Redis, QStash, Playwright, Memory, Skills)
npm run test:infra

# Advanced agent tests (Critic, Red-team, Tenant, Sandbox, etc.)
npm run test:advanced

# Individual tests
npm run test:memory       # pgvector memory retrieval
npm run test:critic       # End-to-end Critic Agent
npm run test:autoapprove  # Auto-approve gate validation
npm run test:build        # Vercel production build check
npm run test:realtime     # Supabase Realtime connectivity
npm run test:qstash       # QStash queue round-trip
```

> Tests require real Supabase + Upstash credentials in `.env.local`.

---

## Benchmark Providers

```bash
npx tsx scripts/benchmark-providers.ts

# Also write results to benchmark-results.json
npx tsx scripts/benchmark-providers.ts --output
```

---

## Cron Jobs

All 8 jobs are declared in `vercel.json` and handled under `src/app/api/cron/`:

| Job | Schedule | Purpose |
|-----|----------|---------|
| `agency-daily` | Daily midnight | Consolidated daily maintenance |
| `key-health` | Every 6 hours | Validate and rotate LLM API keys |
| `quota-guard` | Every hour | Predictive quota exhaustion detection |
| `anomaly-detect` | Every 30 min | Silent failure + latency spike detection |
| `forget-memories` | Weekly Sun 2am | Archive 90+ day unused memories |
| `rls-audit` | Daily 3am | Cross-tenant data isolation audit |
| `gmail-monitor` | Every 15 min | Inbox monitoring + AI draft generation |
| `market-scan` | Daily 6am | UI component market index refresh |

---

## Deployment (Vercel)

1. Push to `master` — Vercel auto-deploys
2. Set all env vars from `.env.example` in Vercel Dashboard → Settings → Environment Variables
3. Verify crons: Vercel Dashboard → Settings → Cron Jobs (should show 8 jobs)
4. Trigger `/api/cron/key-health` manually to verify the key vault loads correctly

---

## Key Pool Setup (Manual)

To run at zero LLM cost, provision the key pool:

1. Create 10 Google accounts → 5 GCP projects each → enable Gemini API → collect 50 Gemini keys
2. Register 10× Groq accounts at `console.groq.com`
3. Register 10× DeepSeek accounts at `platform.deepseek.com`
4. Register 10× Mistral accounts at `console.mistral.ai`
5. Register 10× Cerebras accounts at `cloud.cerebras.ai`
6. Run `npx tsx scripts/key-encrypt.ts` to vault all keys
7. Use `scripts/gcp-batch-setup.sh` to automate GCP project creation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.2.9 (App Router) |
| UI | React 18 + Tailwind CSS (Glassmorphism) |
| Database | Supabase (PostgreSQL + pgvector) |
| Job Queue | Upstash QStash |
| Cache | Upstash Redis |
| LLM Routing | Custom KeyRotator (Gemini, Groq, DeepSeek, Mistral, Cerebras) |
| Browser Automation | Playwright + @sparticuz/chromium (serverless) |
| Deployment | Vercel (Serverless + Edge + Cron) |
| Payments | Stripe |
| Email | Gmail API |
| Notifications | Discord Webhooks |
