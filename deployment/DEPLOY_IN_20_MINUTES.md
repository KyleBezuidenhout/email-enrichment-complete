# 🚀 Deploy Email Enrichment SaaS in 20 Minutes

**Last Updated**: Dec 6, 2025  
**Estimated Time**: 20 minutes  
**Cost**: $5-7/month

---

## Prerequisites

- ✅ Supabase account (ben@superwave.io)
- ✅ GitHub account with code pushed
- ✅ Railway account (sign up free at railway.app)
- ✅ Mail Tester API keys (you already have these)

---

## Step 1: Create Supabase Project (5 minutes)

### 1.1 Log into Supabase
1. Go to: https://supabase.com/dashboard
2. Email: `ben@superwave.io`
3. Password: `Juky#1212123`

### 1.2 Create New Project
1. Click **"New Project"**
2. **Name**: `email-enrichment`
3. **Database Password**: Choose a strong password (save it!)
   - Suggestion: `EmailEnrich2025!Secure`
4. **Region**: Choose closest to you (e.g., `us-east-1`)
5. Click **"Create new project"**
6. ⏳ Wait 2-3 minutes for provisioning

---

## Step 2: Set Up Database (2 minutes)

### 2.1 Run SQL Schema
1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the ENTIRE contents of `/home/ubuntu/email-enrichment-backend/supabase/migrations/00001_initial_schema.sql`
4. Paste into SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)
6. ✅ Should see "Success. No rows returned"

### 2.2 Verify Tables Created
1. Go to **Table Editor** (left sidebar)
2. You should see 10 tables:
   - users
   - api_keys
   - jobs
   - leads
   - results
   - webhooks
   - webhook_deliveries
   - usage_logs
   - rate_limits
   - audit_logs

---

## Step 3: Get Supabase Credentials (1 minute)

### 3.1 Get API Keys
1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:

```
Project URL: https://YOUR_PROJECT_ID.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save these - you'll need them in Step 5

---

## Step 4: Deploy Frontend to Railway (10 minutes)

### 4.1 Install Railway CLI
```bash
npm install -g @railway/cli
```

### 4.2 Login to Railway
```bash
railway login
```
- Browser will open
- Click **"Authorize"**

### 4.3 Deploy Frontend
```bash
cd /home/ubuntu/email-enrichment-frontend

# Initialize Railway project
railway init

# When prompted:
# - Project name: email-enrichment-frontend
# - Start command: pnpm start
# - Build command: pnpm build

# Deploy
railway up

# This will take 3-5 minutes
```

### 4.4 Set Environment Variables
```bash
# Set Supabase credentials
railway variables set NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"

# Set Mail Tester API keys (you already have these)
railway variables set MAIL_TESTER_API_KEY="your_mail_tester_key"
railway variables set MAIL_TESTER_API_KEY_1="your_mail_tester_key_1"
railway variables set MAIL_TESTER_API_KEY_2="your_mail_tester_key_2"
```

### 4.5 Get Your Live URL
```bash
railway domain
```

Copy the URL - this is your live site! 🎉

Example: `https://email-enrichment-frontend-production.up.railway.app`

---

## Step 5: Connect Frontend to Backend (2 minutes)

### 5.1 Update Frontend Environment
The environment variables you set in Step 4.4 are already active.

### 5.2 Redeploy with New Variables
```bash
railway up
```

Wait 2-3 minutes for deployment to complete.

---

## Step 6: Test Your SaaS (5 minutes)

### 6.1 Access Your Site
Open the Railway URL from Step 4.5

### 6.2 Test CSV Upload
1. Click **"Start Free Trial"** or **"Dashboard"**
2. Go to **"Upload CSV"**
3. Upload a test CSV with columns:
   - First Name
   - Last Name
   - Company Domain

### 6.3 Verify Enrichment
1. Job should appear in **"Jobs"** list
2. Status should change from "Pending" → "Processing" → "Completed"
3. Click job to see results
4. Export results as CSV

### 6.4 Check Database
1. Go to Supabase **Table Editor**
2. Check `jobs` table - should have 1 row
3. Check `leads` table - should have rows for each lead
4. Check `results` table - should have enrichment results

---

## 🎉 You're Live!

Your email enrichment SaaS is now deployed and running!

**Your URLs:**
- **Frontend**: `https://your-app.up.railway.app`
- **Backend**: `https://YOUR_PROJECT_ID.supabase.co`
- **GitHub**: `https://github.com/KyleBezuidenhout/email-enrichment-frontend`

---

## Next Steps

### Immediate (Today)
- [ ] Test with real CSV data
- [ ] Verify email enrichment works
- [ ] Check hit rate accuracy
- [ ] Test export functionality

### This Week
- [ ] Add custom domain (Railway settings)
- [ ] Set up Stripe for payments
- [ ] Create pricing page
- [ ] Add user authentication
- [ ] Implement API key generation

### Phase 2 (Sales Navigator Integration)
- [ ] Add Vayne.io API integration
- [ ] Create Sales Nav import page
- [ ] Build cookie + URL input form
- [ ] Test end-to-end scraping workflow

---

## Troubleshooting

### Frontend Not Loading
```bash
# Check Railway logs
railway logs

# Common issues:
# - Build failed: Check package.json scripts
# - Port not exposed: Railway auto-detects port 3000
# - Environment variables missing: Check railway variables list
```

### Database Connection Failed
```bash
# Verify Supabase credentials
railway variables list | grep SUPABASE

# Check Supabase project status
# Go to: https://supabase.com/dashboard
```

### CSV Upload Not Working
1. Check Supabase Table Editor - are tables created?
2. Check Railway logs for errors
3. Verify Mail Tester API keys are set
4. Check browser console for errors (F12)

---

## Cost Breakdown

### Monthly Costs
- **Supabase**: Free tier (500MB DB, 2GB bandwidth)
  - Upgrade: $25/mo for 8GB DB + 50GB bandwidth
- **Railway**: $5/mo (Hobby plan)
  - Includes: 500GB bandwidth, $5 credit
- **Mail Tester API**: ~$0.002 per email verification
  - 10,000 emails = $20/mo

**Total**: $5-30/mo depending on usage

### Revenue Potential
- **Starter**: $49/mo × 100 users = $4,900/mo
- **Growth**: $149/mo × 50 users = $7,450/mo
- **Pro**: $499/mo × 10 users = $4,990/mo

**Potential MRR**: $17,340/mo

---

## Support

### Railway
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway

### Supabase
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com

### Issues
- GitHub: https://github.com/KyleBezuidenhout/email-enrichment-frontend/issues

---

## Security Checklist

- [x] ✅ HTTPS enabled (Railway default)
- [x] ✅ Security headers configured
- [x] ✅ Environment variables secured
- [x] ✅ Row Level Security (RLS) enabled
- [ ] ⏳ Add rate limiting (Phase 2)
- [ ] ⏳ Add CAPTCHA (Phase 2)
- [ ] ⏳ Add API key authentication (Phase 2)

---

## Backup & Recovery

### Supabase Backups
- **Automatic**: Daily backups (retained 7 days on free tier)
- **Manual**: Database → Backups → "Create backup"

### Railway Backups
- **Deployments**: Automatic versioning
- **Rollback**: `railway rollback`

### GitHub Backups
- **Code**: Already backed up in GitHub
- **Restore**: `git clone` + redeploy

---

**Ready to deploy? Start with Step 1!** 🚀
