# 🚀 Loja Africana Rosa - Deployment Guide

Complete guide to deploy the Loja Africana Rosa e-commerce platform to Railway.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Building the Application](#building-the-application)
4. [Railway Deployment](#railway-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Verification & Testing](#verification--testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js:** v18.19.1 or higher
- **npm:** v10.2.4 or higher
- **Git:** For version control
- **Railway Account:** Free account at https://railway.app
- **GitHub Account:** For repository (optional but recommended)

Verify installations:
```bash
node --version    # v18.19.1
npm --version     # 10.2.4
git --version     # 2.x or higher
```

---

## Local Development Setup

### 1. Install Dependencies

```bash
cd loja-africana-rosa-website
npm install
```

This will install all project dependencies including:
- Tailwind CSS for styling
- Angular for frontend framework
- Development tools and build scripts

### 2. Configure Environment Variables

Create `.env.local` file in project root (already configured):

```env
# Figma Configuration
FIGMA_TOKEN=<your-figma-token>
FIGMA_FILE_ID=Xyl5Or2EWoXqfBXgPrykCq
FIGMA_PAGE_NAMES=Design System,Components,Mobile Screens
FIGMA_INCLUDE_FONTS=true
FIGMA_INCLUDE_IMAGES=true

# Application Configuration
NODE_ENV=development
PORT=3000

# Design System
DESIGN_SYSTEM_PATH=./docs/design/figma-design-system.json
```

### 3. Verify Setup

```bash
# Test Figma MCP connection
npm test:figma

# Build design tokens
npm run extract:tokens

# Build application
npm run build
```

---

## Building the Application

### Development Build

```bash
npm run dev
```

Starts development server with hot-reload at `http://localhost:3000`

### Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` directory:
- Minified CSS and JavaScript
- Optimized images and assets
- Tree-shaking and code splitting
- Source maps for debugging

### Build Verification

```bash
# Check build output
ls -lh dist/

# Verify build size
du -sh dist/

# Test production build locally
npm run serve:prod
```

---

## Railway Deployment

### 1. Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "GitHub" (or "Blank Project" for first deployment)
4. Connect your GitHub repository

### 2. Configure Railway Environment

In Railway project dashboard:

1. **Create environment variables:**
   - `NODE_ENV=production`
   - `PORT=3000`
   - `FIGMA_TOKEN=<your-figma-token>`
   - `FIGMA_FILE_ID=Xyl5Or2EWoXqfBXgPrykCq`

2. **Configure build settings:**
   - Build command: `npm run build`
   - Start command: `npm start`
   - Port: `3000`

### 3. Deploy

#### Option A: Automatic Deployment (GitHub)

```bash
# Push to GitHub
git add .
git commit -m "Deploy: Loja Africana Rosa v1.0"
git push origin main
```

Railway automatically detects push and starts deployment.

#### Option B: Manual Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link project
railway link

# Deploy
railway up
```

### 4. Monitor Deployment

Railway dashboard shows:
- Build progress
- Deployment logs
- Service status
- Performance metrics

---

## Environment Configuration

### Production Environment Variables

```env
# Application
NODE_ENV=production
PORT=3000

# Figma Integration
FIGMA_TOKEN=<your-figma-token>
FIGMA_FILE_ID=Xyl5Or2EWoXqfBXgPrykCq

# Optional: Database (if needed)
DATABASE_URL=

# Optional: API Keys
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# Optional: Analytics
GA_MEASUREMENT_ID=
```

### Setting Environment Variables in Railway

1. Go to Project → Variables
2. Add each variable with key and value
3. Click "Deploy" to apply changes

---

## Verification & Testing

### 1. Health Check

```bash
curl https://your-railway-domain.railway.app/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": 1698433200000,
  "uptime": 1234.56
}
```

### 2. Design System Verification

```bash
# Test design tokens loaded
curl https://your-railway-domain.railway.app/api/design-tokens

# Verify component library
curl https://your-railway-domain.railway.app/components
```

### 3. Mobile Responsiveness

- Test at https://your-railway-domain.railway.app
- Verify on different screen sizes (360px, 768px, 1024px+)
- Check touch interactions on mobile devices

### 4. Performance Audit

```bash
# Lighthouse audit
lighthouse https://your-railway-domain.railway.app

# Core Web Vitals check
# Use Chrome DevTools → Lighthouse
```

---

## Production Checklist

- [ ] Environment variables configured in Railway
- [ ] Health check endpoint working
- [ ] Design tokens loaded correctly
- [ ] Components rendering properly
- [ ] Mobile responsive design verified
- [ ] Performance scores acceptable (80+)
- [ ] No console errors in browser
- [ ] Database connected (if applicable)
- [ ] API endpoints responding
- [ ] Monitoring and logs configured

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Port Already in Use

```bash
# Change port in .env
PORT=3001

# Or kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Figma Token Issues

1. Verify token format (starts with `figd_`)
2. Check token hasn't expired (generate new if needed)
3. Test connection: `npm test:figma`

### Deployment Stuck

1. Check Railway logs: `railway logs`
2. Verify build command output
3. Check environment variables are set
4. Clear Railway cache and redeploy

### Application Crashes

1. Check logs: `railway logs --follow`
2. Verify environment variables
3. Check Node.js version compatibility
4. Test locally: `npm run dev`

---

## Performance Optimization

### Code Splitting

Already configured in `tailwind.config.js` and build setup.

### Image Optimization

```bash
# Optimize images before deployment
npm run optimize:images
```

### CSS Purging

Tailwind automatically removes unused CSS in production build.

### Monitoring

Set up Railway monitoring:
1. Go to Project → Monitoring
2. Enable CPU, Memory, and Response Time tracking
3. Set up alerts for high usage

---

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update dependencies safely
npm update

# Major version updates
npm audit fix --force
```

### Database Backups

If using database, set up automated backups:
1. Railway dashboard → Settings
2. Enable backup configuration
3. Set backup frequency

### Logs and Monitoring

- Monitor application logs regularly
- Set up error tracking (Sentry, LogRocket)
- Review performance metrics weekly

---

## Support & Resources

- **Railway Docs:** https://docs.railway.app
- **Project Repo:** [Your GitHub URL]
- **Issues:** Report in GitHub Issues
- **Contact:** Developed by Limitless GMTech Solutions

---

## Summary

Deployment checklist:
1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Build application
4. ✅ Push to GitHub (or Railway)
5. ✅ Monitor deployment
6. ✅ Verify production setup
7. ✅ Set up monitoring and alerts

**Application is now live and ready for use!**

Developed by **Ginquel Moreira** - Limitless GMTech Solutions, Lda  
Built with AI-Assisted Development using Claude Code

