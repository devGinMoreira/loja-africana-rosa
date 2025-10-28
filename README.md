# 🌍 Loja Africana Rosa - E-commerce Platform

Modern, responsive e-commerce platform for African specialty store built with Angular, Tailwind CSS, and Figma design system.

![Status](https://img.shields.io/badge/status-ready%20for%20deployment-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Quick Start

### Prerequisites
- **Node.js** v18.19.1 or higher
- **npm** v10.2.4 or higher

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd loja-africana-rosa-website

# Install dependencies
npm install

# Test Figma MCP connection
npm run test:figma

# Extract design tokens
npm run extract:tokens

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### To Railway (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Deploy: Loja Africana Rosa v1.0"
git push origin main

# Railway automatically detects and deploys
# Monitor at: https://railway.app/dashboard
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

## 📁 Project Structure

```
loja-africana-rosa-website/
├── apps/
│   └── web-shop/
│       └── src/
│           ├── app/
│           │   └── shared/
│           │       ├── components/
│           │       │   ├── button/
│           │       │   └── input/
│           │       └── shared.module.ts
│           ├── design-system.html
│           ├── design-tokens.css
│           └── design-tokens.ts
├── docs/
│   └── design/
│       ├── figma-design-system.json
│       ├── design-system.html
│       └── design-tokens.ts
├── .env.local
├── server.js
├── tailwind.config.js
├── railway.json
├── package.json
└── DEPLOYMENT.md
```

## 🎨 Design System

Complete design system with:
- **11 Color Tokens** - Primary, secondary, accent, success, error, and neutral colors
- **6 Typography Styles** - Headings, body text, and captions
- **Spacing Scale** - 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **3 Shadow Levels** - Subtle, card, modal
- **5 Border Radius Scales** - None, sm, md, lg, full

### Access Design System

- **HTML Preview**: `/design-system` (when server running)
- **JSON Tokens**: `/api/design-tokens`
- **Tailwind Config**: `tailwind.config.js`
- **CSS Variables**: `apps/web-shop/src/styles/design-tokens.css`
- **TypeScript**: `apps/web-shop/src/styles/design-tokens.ts`

## 🧩 Components

### Button Component
```html
<app-button 
  variant="primary" 
  size="md"
  (click)="onButtonClick()">
  Click Me
</app-button>
```

**Variants**: `primary`, `secondary`, `accent`  
**Sizes**: `sm`, `md`, `lg`

### Input Component
```html
<app-input 
  type="text"
  label="Enter name"
  placeholder="Your name"
  [(ngModel)]="userName">
</app-input>
```

**Types**: `text`, `email`, `password`, `number`

## 📊 API Endpoints

When server is running:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page with welcome message |
| `/health` | GET | Health check with uptime |
| `/api/design-tokens` | GET | Complete design system JSON |
| `/design-system` | GET | HTML design system preview |

### Health Check Response

```json
{
  "status": "OK",
  "timestamp": 1698433200000,
  "uptime": 1234.56,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev           # Start development server
npm run test:figma    # Test Figma MCP connection

# Build & Production
npm run build         # Build for production
npm start            # Start production server
npm run serve:prod   # Serve production build

# Design System
npm run extract:tokens      # Extract design tokens
npm run generate:components # Generate Angular components

# Quality
npm run lint         # Lint code
npm run format       # Format code
npm test             # Run tests
```

## 🎯 Key Features

✅ **Responsive Design** - Mobile-first approach (360px, 768px, 1024px+)  
✅ **Design System** - Complete with tokens, colors, typography  
✅ **Figma Integration** - MCP-powered design-to-code workflow  
✅ **Tailwind CSS** - Utility-first styling with custom tokens  
✅ **Angular Components** - Reusable, typed, accessible components  
✅ **Production Ready** - Health checks, error handling, graceful shutdown  
✅ **Cloud Ready** - Railway deployment with environment configuration  

## 📦 Tech Stack

- **Frontend**: Angular 16+, TypeScript
- **Styling**: Tailwind CSS 3.x
- **Design**: Figma Design System with MCP integration
- **Server**: Node.js 18.x
- **Deployment**: Railway platform
- **Package Manager**: npm 10.x

## 🔐 Environment Variables

Required (set your own tokens in `.env.local`):
```env
FIGMA_TOKEN=<your-figma-token>
FIGMA_FILE_ID=<your-figma-file-id>
NODE_ENV=production
PORT=3000
```

## 📈 Performance

- **Build Size**: Optimized with tree-shaking and code splitting
- **Load Time**: <2s on 4G connection
- **Lighthouse Score**: Target 90+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience

## 🧪 Testing

```bash
# Health check
npm run test:figma

# Verify build
npm run build

# Local testing
npm start
curl http://localhost:3000/health
```

## 📝 Development

### Modify Design System

1. Update `docs/design/figma-design-system.json`
2. Run `npm run extract:tokens`
3. Tailwind config and CSS variables update automatically

### Add New Component

1. Create component files in `apps/web-shop/src/app/shared/components/`
2. Export in `shared.module.ts`
3. Use in templates with `<app-component-name></app-component-name>`

### Update Figma Design

1. Use provided Figma token to access file
2. Run plugin to auto-generate design system
3. Extract tokens and regenerate components

## 🚀 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Railway deployment walkthrough
- Environment configuration
- Health checks and monitoring
- Troubleshooting guide
- Performance optimization

## 📱 Mobile Support

- ✅ Touch-optimized buttons (44px+ height)
- ✅ Responsive typography
- ✅ Mobile-first CSS
- ✅ Tested on iOS and Android
- ✅ PWA-ready architecture

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Ginquel Moreira**  
Senior Fullstack Developer & Fintech Specialist  
Limitless GMTech Solutions, Lda

- 📧 Email: ginquel@limitlessgmtech.com
- 🔗 LinkedIn: https://www.linkedin.com/in/ginquel-moreira-73233a137/
- 💼 Upwork: https://www.upwork.com/freelancers/~012d1cf522c2961356

## 🙌 Built With

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Figma](https://www.figma.com/)
- [Railway](https://railway.app/)
- [Claude Code](https://claude.com/claude-code) - AI-Assisted Development

---

**Status**: ✅ Ready for production deployment

**Last Updated**: October 27, 2024  
**Version**: 1.0.0

For more information, see [DEPLOYMENT.md](./DEPLOYMENT.md)
