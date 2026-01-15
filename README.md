# 🚗 RPP Auto - Recession-Proof Products Automotive SaaS

**Production-Ready Full-Stack Automotive Diagnostic Platform**

[![Deploy to IONOS](https://img.shields.io/badge/Deploy-IONOS-blue)](https://recessionproofproducts.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

---

## 🌟 Features

### Backend (FastAPI)
- ✅ **RESTful API** with automatic OpenAPI documentation
- ✅ **PostgreSQL Database** (Supabase) with connection pooling
- ✅ **Stripe Integration** for payments and subscriptions
- ✅ **JWT Authentication** with refresh tokens
- ✅ **OBD2 Vehicle Diagnostics** via Motor DaaS API
- ✅ **AI-Powered Analysis** using OpenRouter and Auto.dev
- ✅ **Email Notifications** via Resend
- ✅ **Google Maps Integration**
- ✅ **Rate Limiting** and CORS security
- ✅ **Health Check Endpoint** for monitoring

### Frontend
- ✅ **Next.js Web App** (TypeScript)
- ✅ **React Native Mobile** (iOS & Android)
- ✅ **Responsive Design**
- ✅ **Real-time Updates**

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 20+
- PostgreSQL (or Supabase account)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Owwmann/RPP-AUTO-FullStack.git
cd RPP-AUTO-FullStack
```

### 2. Backend Setup
```bash
cd rpp-auto-backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Environment Configuration
```bash
cp production.env.example production.env
# Edit production.env with your API keys
```

### 4. Database Setup
```bash
alembic upgrade head
python seed_cms.py
```

### 5. Run Development Server
```bash
uvicorn main:app --reload --port 8080
```

API will be available at: http://localhost:8080  
Docs: http://localhost:8080/docs

---

## 📦 Production Deployment (IONOS)

### Automated Deployment

**Option 1: IONOS Deploy Now (Recommended)**
1. Push to main branch triggers automatic deployment
2. IONOS reads `.ionos.yaml` configuration
3. Application deployed to recessionproofproducts.com

**Option 2: Manual Server Deployment**
```bash
# On IONOS server
chmod +x rpp-auto-backend/task15_deploy.sh
./rpp-auto-backend/task15_deploy.sh
```

**Option 3: Mobile Deployment (Termux)**
```bash
chmod +x deploy-mobile.sh
./deploy-mobile.sh
```

### Environment Variables

Add these in IONOS Deploy Now dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_SERVICE_ROLE` | Supabase service role key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key (live) | ✅ |
| `JWT_SECRET` | JWT signing secret (32+ chars) | ✅ |
| `MOTOR_DAAS_PUBLIC` | Motor DaaS public key | ✅ |
| `MOTOR_DAAS_PRIVATE` | Motor DaaS private key | ✅ |
| `RESEND_API_KEY` | Resend email API key | ✅ |
| `GOOGLE_MAPS_KEY` | Google Maps API key | ✅ |
| `OPENROUTER_API_KEY` | OpenRouter API key | ⚠️ |
| `AUTO_DEV_KEY` | Auto.dev API key | ⚠️ |

---

## 🏗️ Project Structure

```
RPP-AUTO-FullStack/
├── rpp-auto-backend/          # FastAPI Backend
│   ├── main.py                # API entry point
│   ├── routers/               # API routes
│   ├── services/              # Business logic
│   ├── models/                # Database models
│   ├── schemas/               # Pydantic schemas
│   ├── utils/                 # Utilities
│   ├── alembic/               # Database migrations
│   ├── requirements.txt       # Python dependencies
│   ├── task2_database.py      # Database config
│   ├── task15_deploy.sh       # Deployment script
│   └── production.env.example # Environment template
├── frontend/                  # Next.js Web App
├── mobile/                    # React Native App
├── .ionos.yaml               # IONOS Deploy Now config
├── deploy-mobile.sh          # Mobile deployment
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

### Vehicles
- `GET /vehicles` - List user vehicles
- `POST /vehicles` - Add new vehicle
- `GET /vehicles/{id}` - Get vehicle details
- `PUT /vehicles/{id}` - Update vehicle
- `DELETE /vehicles/{id}` - Delete vehicle

### Diagnostics
- `POST /diagnostics/scan` - Run OBD2 diagnostic scan
- `GET /diagnostics/{id}` - Get diagnostic report
- `GET /diagnostics/history` - Diagnostic history

### Maintenance
- `GET /maintenance/schedule` - Get maintenance schedule
- `POST /maintenance/log` - Log maintenance activity
- `GET /maintenance/reminders` - Get upcoming reminders

### Payments
- `POST /payments/create-checkout` - Create Stripe checkout
- `POST /payments/webhook` - Stripe webhook handler
- `GET /payments/subscriptions` - User subscriptions

### Health
- `GET /health` - API health check
- `GET /health/db` - Database health check

**Full API Documentation:** https://api.recessionproofproducts.com/docs

---

## 🧪 Testing

```bash
# Backend tests
cd rpp-auto-backend
pytest

# Frontend tests
cd frontend
npm test

# Mobile tests
cd mobile
npm test
```

---

## 📊 Monitoring

### Health Check
```bash
curl https://api.recessionproofproducts.com/health
```

### Application Logs
```bash
# PM2 logs
pm2 logs rpp-auto

# Real-time monitoring
pm2 monit

# Application status
pm2 status
```

### Database Monitoring
```bash
# Check connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"

# Database size
psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size('postgres'));"
```

---

## 🔒 Security

- ✅ HTTPS enforced (SSL via IONOS/Let's Encrypt)
- ✅ CORS configured for trusted origins
- ✅ Rate limiting on all endpoints
- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with bcrypt
- ✅ SQL injection prevention (SQLAlchemy ORM)
- ✅ XSS protection
- ✅ Environment variables for secrets
- ✅ Webhook signature verification (Stripe)

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📧 Support

- **Website:** https://recessionproofproducts.com
- **API:** https://api.recessionproofproducts.com
- **Documentation:** https://api.recessionproofproducts.com/docs
- **Email:** support@recessionproofproducts.com

---

## 🙏 Acknowledgments

- FastAPI - Modern Python web framework
- Supabase - PostgreSQL database hosting
- Stripe - Payment processing
- Motor DaaS - Vehicle data API
- IONOS - Cloud hosting
- OpenRouter - AI model routing
- Resend - Email delivery

---

**Built with ❤️ for automotive professionals**

🚀 **Deploy Now:** Push to main branch to trigger IONOS deployment!
