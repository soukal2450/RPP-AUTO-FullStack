#!/bin/bash
# RPP Auto - Mobile Deployment Script (Termux Compatible)
# Quick deployment from Android/Mobile device

set -e

echo "🚀 RPP Auto Mobile Deployment"
echo "================================"

# Configuration
SERVER="root@s1080048923.onlinehome.us"
APP_DIR="/var/www/RPP_AUTO"

# Check SSH connection
echo "📡 Testing connection to IONOS server..."
if ! ssh -q $SERVER exit; then
    echo "❌ Cannot connect to server"
    echo "Please check:"
    echo "  1. SSH is enabled on IONOS"
    echo "  2. You have the correct password"
    echo "  3. Internet connection is stable"
    exit 1
fi
echo "✅ Connected to server"

# Deploy
echo "📦 Deploying application..."
ssh $SERVER << 'DEPLOY_SCRIPT'
set -e

cd /var/www/RPP_AUTO
echo "📥 Pulling latest code..."
git pull origin main

cd rpp-auto-backend
echo "🔧 Installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt --quiet

echo "🗄️  Running migrations..."
if [ -f "production.env" ]; then
    export $(cat production.env | xargs)
fi
alembic upgrade head || echo "⚠️  Migrations skipped"

echo "🔄 Restarting application..."
pm2 restart rpp-auto
pm2 save

echo "✅ Deployment complete"
DEPLOY_SCRIPT

# Verify
echo "🔍 Verifying deployment..."
sleep 3
RESPONSE=$(curl -s https://api.recessionproofproducts.com/health || echo "failed")

if echo "$RESPONSE" | grep -q '"status".*"healthy"'; then
    echo "✅ Deployment successful!"
    echo "🌐 Site: https://recessionproofproducts.com"
    echo "🔗 API: https://api.recessionproofproducts.com"
    echo "❤️  Health: https://api.recessionproofproducts.com/health"
else
    echo "❌ Health check failed"
    echo "Response: $RESPONSE"
    echo "Check logs: ssh $SERVER 'pm2 logs rpp-auto --lines 50'"
    exit 1
fi

echo "================================"
echo "🎉 All done!"
