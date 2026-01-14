# 🚀 CarFix AI - Deployment Guide

Complete step-by-step guide to deploy your full-stack app.

## 📋 Prerequisites

- Node.js 18+ installed
- Docker installed (for local testing)
- Expo account (free)
- Railway/Heroku account (for backend)
- Google Play Developer account (for app publishing)

---

## PART 1: LOCAL TESTING

### Step 1: Start Backend Locally

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your database URL
DATABASE_URL="postgresql://user:password@localhost:5432/carfixai"

# Run migrations
npx prisma migrate dev

# Seed database
npm run seed

# Start server
npm run dev
```

### Step 2: Test Mobile App Locally

```bash
cd mobile
npm install

# Update src/constants/index.ts with your computer's IP
BASE_URL: 'http://192.168.1.100:3000'

# Start Expo
npm start

# Scan QR with Expo Go app on phone
```

---

## PART 2: DEPLOY BACKEND

### Option A: Railway (Recommended)

1. **Sign up** at railway.app
2. **Create new project** → Deploy from GitHub
3. **Add PostgreSQL** database service
4. **Configure environment variables:**
   ```
   DATABASE_URL (auto-set by Railway)
   JWT_SECRET=your-random-string
   STRIPE_SECRET_KEY=sk_test_...
   PORT=3000
   ```
5. **Deploy!**
6. **Copy your app URL:** https://carfixai-production.up.railway.app

### Option B: Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create carfixai-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set STRIPE_SECRET_KEY=sk_test_...

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma migrate deploy
```

---

## PART 3: BUILD MOBILE APK

### Using Expo EAS (Easiest)

```bash
cd mobile

# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure

# Update src/constants/index.ts with production backend URL
BASE_URL: 'https://carfixai-production.up.railway.app'

# Build APK
eas build --platform android --profile preview

# Wait 10-15 minutes, then download APK from provided link
```

### Alternative: Android Studio

```bash
cd mobile
expo prebuild
cd android
./gradlew assembleRelease

# APK in: android/app/build/outputs/apk/release/app-release.apk
```

---

## PART 4: PUBLISH TO GOOGLE PLAY

1. **Create Google Play Developer Account** ($25 one-time fee)
2. **Create app in Play Console**
3. **Fill out app details:**
   - Title: CarFix AI
   - Category: Tools / Auto & Vehicles
   - Screenshots (use emulator)
   - Privacy policy (required)
4. **Upload APK** (or AAB for production)
5. **Submit for review**
6. **Wait 1-3 days for approval**

---

## PRODUCTION CHECKLIST

### Backend
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS only
- [ ] Set up database backups
- [ ] Configure proper CORS
- [ ] Add monitoring (Sentry)
- [ ] Set up logging
- [ ] Add rate limiting (already included)
- [ ] Enable Stripe webhooks

### Mobile
- [ ] Update API URL to production
- [ ] Add real Stripe keys
- [ ] Add Google Maps API key
- [ ] Test on multiple devices
- [ ] Optimize images
- [ ] Enable Sentry error tracking
- [ ] Test payment flow

### Database
- [ ] Run migrations on production
- [ ] Seed initial data
- [ ] Set up automated backups
- [ ] Monitor performance

---

## ENVIRONMENT VARIABLES

### Backend Production
```env
DATABASE_URL=postgresql://...
JWT_SECRET=super-secure-random-string-change-this
STRIPE_SECRET_KEY=sk_live_...
PORT=3000
NODE_ENV=production
```

### Mobile Production
```typescript
// src/constants/index.ts
BASE_URL: 'https://your-backend-url.com',
STRIPE_PUBLISHABLE_KEY: 'pk_live_...',
GOOGLE_MAPS_API_KEY: 'AIza...',
```

---

## TESTING PRODUCTION

### Backend Health Check
```bash
curl https://your-backend-url.com/health
```

Should return:
```json
{"status":"ok","timestamp":"2024-..."}
```

### Test Signup
```bash
curl -X POST https://your-backend-url.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test1234","name":"Test"}'
```

### Test Mobile App
1. Install APK on Android phone
2. Create account
3. Add a vehicle
4. Run diagnostic scan
5. Search parts
6. Find mechanics
7. Chat with AI
8. Test payment (use Stripe test card: 4242 4242 4242 4242)

---

## MONITORING

### Backend Monitoring
```bash
# Add to backend/src/server.js
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'your-sentry-dsn' });
```

### Mobile Monitoring
```bash
# Add to mobile
npm install @sentry/react-native
npx @sentry/wizard -i reactNative
```

---

## MAINTENANCE

### Update Backend
```bash
git pull
npm install
npx prisma migrate deploy
pm2 restart all  # or railway/heroku will auto-restart
```

### Update Mobile App
1. Increment version in app.json
2. Build new APK with EAS
3. Upload to Play Console
4. Submit update

---

## COSTS ESTIMATE

- **Backend Hosting:** $5-20/month (Railway/Heroku)
- **Database:** $7-15/month (PostgreSQL)
- **Google Play Account:** $25 (one-time)
- **Stripe:** 2.9% + $0.30 per transaction
- **Expo EAS:** Free tier available
- **Total:** ~$15-40/month + transaction fees

---

## BACKUP & RECOVERY

### Database Backups
```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### Automated Backups
- Railway: Built-in backups
- Heroku: Install pgbackups addon

---

## SCALING

When you grow:

1. **Backend:**
   - Add Redis for caching
   - Use CDN for images
   - Add load balancer
   - Scale to multiple servers

2. **Database:**
   - Upgrade to larger plan
   - Add read replicas
   - Optimize queries

3. **Mobile:**
   - Use CodePush for updates
   - Add analytics
   - Optimize bundle size

---

## 🎉 CONGRATULATIONS!

Your CarFix AI platform is now live!

Backend: https://your-app.up.railway.app  
Mobile: Available on Google Play

**Next Steps:**
- Share with users
- Gather feedback
- Add features
- Scale!
