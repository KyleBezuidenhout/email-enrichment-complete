# Email Enrichment MVP - TODO

## 🔴 Critical Issues (Blocking)

- [ ] Build backend API server (Node.js/Express)
- [ ] Deploy backend API to Railway
- [ ] Connect frontend to backend API
- [ ] Apply Supabase database migrations
- [ ] Configure environment variables for backend

## 🟡 Core Features (MVP)

### Authentication & User Management
- [ ] Implement password-based login system
- [ ] Create user registration flow
- [ ] Add session management
- [ ] Implement role-based access control (admin/user)
- [ ] Add user profile page

### Email Enrichment Engine
- [ ] Integrate email finding API (Hunter.io, Snov.io, or similar)
- [ ] Implement email verification logic
- [ ] Add catch-all detection
- [ ] Build batch processing queue
- [ ] Add job status tracking
- [ ] Implement CSV upload and parsing
- [ ] Add CSV export functionality

### Admin Dashboard
- [ ] Create admin dashboard layout
- [ ] Display all user searches/jobs
- [ ] Show real-time job statistics
- [ ] Add user management interface
- [ ] Display system-wide analytics
- [ ] Add job filtering and search
- [ ] Show revenue/usage metrics

### User Dashboard
- [ ] Create user dashboard layout
- [ ] Display user's job history
- [ ] Show job details page
- [ ] Add job progress tracking
- [ ] Implement results download
- [ ] Add usage statistics

## 🟢 Additional Features

### API & Integrations
- [ ] Create REST API endpoints
- [ ] Add API key management
- [ ] Implement rate limiting
- [ ] Add webhook support
- [ ] Create API documentation

### Billing & Pricing
- [ ] Implement credit system
- [ ] Add pricing tiers
- [ ] Integrate payment processing
- [ ] Create billing dashboard
- [ ] Add usage tracking

### UI/UX Improvements
- [ ] Add loading states
- [ ] Improve error handling
- [ ] Add success notifications
- [ ] Create empty states
- [ ] Add onboarding flow

## 🔧 Technical Improvements

### Backend
- [ ] Set up database connection pooling
- [ ] Add request validation middleware
- [ ] Implement error logging
- [ ] Add health check endpoints
- [ ] Set up background job processing

### Frontend
- [ ] Fix missing pages (Pricing, Docs)
- [ ] Add proper error boundaries
- [ ] Implement optimistic UI updates
- [ ] Add form validation
- [ ] Improve responsive design

### DevOps
- [ ] Set up CI/CD pipeline
- [ ] Add automated testing
- [ ] Configure monitoring and alerts
- [ ] Set up database backups
- [ ] Add environment-specific configs

## 📝 Documentation

- [ ] Write API documentation
- [ ] Create user guide
- [ ] Add developer setup instructions
- [ ] Document deployment process
- [ ] Create troubleshooting guide

## 🐛 Known Bugs

- [ ] "Failed to start enrichment" error - missing backend API
- [ ] Missing /pricing page (404 error)
- [ ] Missing /docs page (404 error)
- [ ] No authentication system implemented
- [ ] No actual email enrichment logic

## 🎯 Priority Order

1. Build and deploy backend API server
2. Implement password authentication
3. Connect email enrichment API
4. Create admin dashboard
5. Add billing/credits system
6. Polish UI/UX
7. Add documentation


## 🎯 UPDATED: Email Permutation Strategy (32 Patterns)

### Implementation Requirements
- [ ] Implement 32 email permutation patterns (currently only 10)
- [ ] Add company size detection/input
- [ ] Create ranked permutation logic based on company size:
  - 1-50 employees: Start with {first} (41.91% prevalence)
  - 51-200 employees: Start with {f}{last} (41.76% prevalence)
  - 201-500 employees: Start with {f}{last} (44.75% prevalence)
  - 500+ employees: Start with {first}.{last} (56.31% prevalence)
- [ ] Stop verification on first valid email (credit optimization)
- [ ] Implement deduplication logic
- [ ] Add prevalence scoring system
- [ ] Integrate with MailTester Ninja API (170 emails/30s rate limit)

### 32 Email Patterns (Ranked by Company Size)
See attached CSV files for complete rankings:
- email_permutations_1_50.csv
- email_permutations_51_200.csv
- email_permutations_201_500.csv
- email_permutations_500plus.csv

### Key Patterns to Implement
1. {first} - firstname@domain.com
2. {f}{last} - flastname@domain.com
3. {first}.{last} - firstname.lastname@domain.com
4. {first}{l} - firstnamel@domain.com
5. {last} - lastname@domain.com
6. {last}.{first} - lastname.firstname@domain.com
7. {last}{f} - lastnamef@domain.com
8. {first}_{last} - firstname_lastname@domain.com
9. {f}.{last} - f.lastname@domain.com
10. {first}{last} - firstnamelastname@domain.com
... (22 more patterns)

### Rate Limiting Strategy
- MailTester Ultimate Plan: 170 emails per 30 seconds
- 1 email per 176ms minimum
- Implement queue system for batch processing
- Stop on first valid email to save credits
