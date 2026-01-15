#!/bin/bash
# RPP Auto - Production Deployment Script
# For IONOS Server: s1080048923.onlinehome.us
# Target Domain: recessionproofproducts.com

set -e  # Exit on any error

echo "========================================"
echo "🚀 RPP Auto Production Deployment"
echo "========================================"

# Configuration
APP_DIR="/var/www/RPP_AUTO"
BACKEND_DIR="$APP_DIR/rpp-auto-backend"
LOG_DIR="/var/log/rpp-auto"
VENV_DIR="$BACKEND_DIR/venv"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Step 1: System Update
log_info "Step 1: Updating system packages..."
apt update && apt upgrade -y
log_info "System updated successfully"

# Step 2: Install Dependencies
log_info "Step 2: Installing dependencies..."
apt install -y python3.9 python3.9-venv python3-pip postgresql-client nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
log_info "Dependencies installed"

# Step 3: Create Application Directory
log_info "Step 3: Setting up application directory..."
mkdir -p $APP_DIR
mkdir -p $LOG_DIR
cd $APP_DIR
log_info "Directories created"

# Step 4: Clone Repository (if not exists)
if [ ! -d "$BACKEND_DIR" ]; then
    log_info "Step 4: Cloning repository..."
    git clone https://github.com/Owwmann/RPP-AUTO-FullStack.git .
else
    log_info "Step 4: Updating repository..."
    git pull origin main
fi
log_info "Repository synchronized"

# Step 5: Setup Python Virtual Environment
log_info "Step 5: Setting up Python virtual environment..."
cd $BACKEND_DIR
if [ ! -d "$VENV_DIR" ]; then
    python3.9 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
log_info "Python environment ready"

# Step 6: Database Migrations
log_info "Step 6: Running database migrations..."
if [ -f "production.env" ]; then
    export $(cat production.env | xargs)
fi

if command -v alembic &> /dev/null; then
    alembic upgrade head
    log_info "Database migrations completed"
else
    log_warning "Alembic not found, skipping migrations"
fi

# Step 7: Configure Nginx
log_info "Step 7: Configuring Nginx..."
cat > /etc/nginx/sites-available/rpp-auto <<'NGINX_EOF'
server {
    listen 80;
    server_name recessionproofproducts.com api.recessionproofproducts.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:8080/health;
        access_log off;
    }
}
NGINX_EOF

ln -sf /etc/nginx/sites-available/rpp-auto /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
log_info "Nginx configured"

# Step 8: Start Application with PM2
log_info "Step 8: Starting application..."
pm2 delete rpp-auto 2>/dev/null || true
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4" --name rpp-auto
pm2 save
pm2 startup systemd -u root --hp /root
log_info "Application started"

# Step 9: SSL Certificate
log_info "Step 9: Installing SSL certificate..."
if command -v certbot &> /dev/null; then
    certbot --nginx -d recessionproofproducts.com -d api.recessionproofproducts.com \
        --non-interactive --agree-tos -m admin@recessionproofproducts.com --redirect || log_warning "SSL setup failed, configure manually"
else
    log_warning "Certbot not found, install SSL manually"
fi

# Step 10: Verify Deployment
log_info "Step 10: Verifying deployment..."
sleep 5
HEALTH_RESPONSE=$(curl -s http://localhost:8080/health || echo "failed")
if echo "$HEALTH_RESPONSE" | grep -q '"status"'; then
    log_info "✅ Deployment successful!"
    log_info "Application is running at: https://recessionproofproducts.com"
    log_info "API endpoint: https://api.recessionproofproducts.com"
    log_info "Health check: https://api.recessionproofproducts.com/health"
else
    log_error "❌ Health check failed"
    log_error "Response: $HEALTH_RESPONSE"
    pm2 logs rpp-auto --lines 50
    exit 1
fi

echo "========================================"
echo "✅ Deployment Complete!"
echo "========================================"
echo "Next steps:"
echo "1. Verify: curl https://api.recessionproofproducts.com/health"
echo "2. Monitor: pm2 monit"
echo "3. Logs: pm2 logs rpp-auto"
echo "========================================"
