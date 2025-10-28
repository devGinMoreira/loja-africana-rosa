# 🏪 Loja Africana Rosa - Frontend (Angular 18)

**Modern E-commerce Platform for African Specialty Store**

> Portuguese-first e-commerce website with complete internationalization support (PT-PT, EN-US)

---

## 📦 Tech Stack

- **Framework**: Angular 18
- **State Management**: NgRx (with DevTools)
- **Styling**: Tailwind CSS
- **Internationalization**: @ngx-translate/core
- **HTTP Client**: Angular HttpClient with interceptors
- **Bundler**: Nx Monorepo

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Install additional translation and state management libraries
npm install @ngx-translate/core @ngx-translate/http-loader
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
npm install -D tailwindcss postcss autoprefixer
```

### Development Server

```bash
# Start development server on http://localhost:4200
npm start

# Or using Nx
nx serve web-shop
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Or using Nx
nx build web-shop --configuration=production
```

---

## 📁 Project Structure

```
apps/web-shop/src/
├── app/
│   ├── core/                    # Singletons, guards, interceptors
│   │   ├── auth/               # Authentication service & guard
│   │   ├── http/               # API service & JWT interceptor
│   │   ├── services/           # Notification, i18n services
│   │   └── core.module.ts
│   │
│   ├── store/                  # NgRx state management
│   │   ├── auth/              # Auth state, actions, reducer, effects
│   │   ├── cart/              # Cart state, actions, reducer, selectors
│   │   ├── products/          # Products state (partial)
│   │   └── orders/            # Orders state (partial)
│   │
│   ├── features/              # Feature modules (lazy-loaded)
│   │   ├── home/              # Landing page with categories
│   │   ├── auth/              # Login, register, profile
│   │   ├── products/          # Product catalog
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Multi-step checkout
│   │   ├── orders/            # Order management
│   │   └── account/           # User account management
│   │
│   ├── shared/                # Reusable components & utilities
│   │   ├── components/        # Notification, header, footer
│   │   └── shared.module.ts
│   │
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
│
├── assets/
│   ├── i18n/                  # Translation files
│   │   ├── pt-PT.json         # Portuguese (primary)
│   │   └── en-US.json         # English (secondary)
│   └── images/
│
├── environments/              # Environment configurations
│   ├── environment.ts         # Development
│   └── environment.prod.ts    # Production
│
├── styles/                    # Global styles
│   └── styles.css            # Tailwind CSS imports
│
└── index.html
```

---

## 🔐 Authentication

### Services
- **AuthService** (`core/auth/auth.service.ts`): JWT token management, login/register, user profile
- **JwtInterceptor** (`core/http/jwt.interceptor.ts`): Automatic token injection, refresh token handling
- **AuthGuard** (`core/auth/auth.guard.ts`): Route protection for authenticated users

### Features
- ✅ JWT-based authentication with refresh tokens
- ✅ Automatic token refresh on 401 responses
- ✅ Secure localStorage token storage
- ✅ User role-based access control (customer, admin)
- ✅ Token expiration validation

### Usage
```typescript
// In component
constructor(private authService: AuthService) {}

login(email: string, password: string) {
  this.authService.login({ email, password }).subscribe(
    response => console.log('Login successful'),
    error => console.error('Login failed')
  );
}

// Check authentication
if (this.authService.isAuthenticated()) {
  // User is logged in
}
```

---

## 🌍 Internationalization (i18n)

### Supported Languages
- **Portuguese (pt-PT)** - Primary language
- **English (en-US)** - Secondary language

### Features
- ✅ 500+ translation keys covering all UI
- ✅ Language persistence in localStorage
- ✅ Real-time language switching without page reload
- ✅ Automatic fallback to Portuguese
- ✅ Date, currency, and number formatting

### Usage

**In Templates**:
```html
<h1>{{ 'common.appName' | translate }}</h1>
<button>{{ 'auth.login' | translate }}</button>
```

**In Components**:
```typescript
constructor(private i18nService: I18nService) {}

ngOnInit() {
  // Get current language
  const lang = this.i18nService.getCurrentLanguage(); // 'pt-PT'
  
  // Switch language
  this.i18nService.setLanguage('en-US');
  
  // Subscribe to language changes
  this.i18nService.currentLanguage$.subscribe(lang => {
    console.log('Language changed to:', lang);
  });
}
```

---

## 📊 State Management (NgRx)

### Auth Store
```typescript
// Actions
dispatch(loginSuccess({ response }))
dispatch(logout())
dispatch(updateProfile({ data }))

// Selectors
selectIsAuthenticated$         // Observable<boolean>
selectCurrentUser$             // Observable<UserInfo | null>
selectIsAdmin$                 // Observable<boolean>
selectAuthLoading$             // Observable<boolean>
selectAuthError$               // Observable<string | null>
```

### Cart Store
```typescript
// Actions
dispatch(addToCart({ item }))
dispatch(removeFromCart({ productId }))
dispatch(updateCartItem({ productId, quantity }))
dispatch(applyPromoCode({ code }))

// Selectors
selectCartItems$               // Observable<CartItem[]>
selectCartTotal$               // Observable<number>
selectCartItemsCount$          // Observable<number>
selectCartEmpty$               // Observable<boolean>
selectCartDeliveryFee$         // Observable<number>
selectCartTax$                 // Observable<number>
```

---

## 🛒 Shopping Cart Logic

### Cart Totals Calculation
```
Subtotal = Sum of (Product Price × Quantity)
VAT (13%) = Subtotal × 0.13
Delivery Fee = €3.50 (Free if Subtotal ≥ €30 in Almada)
Discount = (Promotional Code / Manual Discount)
Total = Subtotal + VAT + Delivery Fee - Discount
```

### Features
- ✅ Real-time cart updates
- ✅ Persistent cart (localStorage + server sync)
- ✅ Promotional code validation
- ✅ Automatic delivery fee calculation
- ✅ Stock validation before checkout

---

## 📱 Responsive Design

Built with **Tailwind CSS** for mobile-first responsive design:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

Example:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Content -->
</div>
```

---

## 🔗 API Integration Points

### Authentication Endpoints
```
POST   /api/auth/login              - User login
POST   /api/auth/register           - User registration
POST   /api/auth/refresh            - Refresh access token
GET    /api/auth/me                 - Get current user
PUT    /api/auth/me                 - Update user profile
POST   /api/auth/change-password    - Change password
```

### Product Endpoints
```
GET    /api/products?page=1&limit=20&sort=newest
GET    /api/products/:id
GET    /api/products/search?q=term
POST   /api/products/:id/reviews
GET    /api/products/:id/reviews
```

### Cart Endpoints
```
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:itemId
DELETE /api/cart/items/:itemId
DELETE /api/cart
POST   /api/cart/promo
```

### Order Endpoints
```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id
DELETE /api/orders/:id
GET    /api/orders/:id/tracking
```

---

## 🎨 UI Components

### Notification Component
Toast notifications for user feedback.

```typescript
// Usage
constructor(private notificationService: NotificationService) {}

this.notificationService.success('Profile updated successfully');
this.notificationService.error('Failed to save changes');
this.notificationService.warning('Please review your cart');
this.notificationService.info('Processing your order...');
```

**Features**:
- Auto-dismiss after duration
- Manual dismiss button
- Success, error, warning, info types
- Smooth slide-in animation

### Layout Components (Todo)
- Header (logo, search, nav, account, cart, language)
- Footer (links, contact, social, newsletter)
- Navigation (responsive mobile menu)
- Breadcrumb (page navigation)
- Pagination (list navigation)
- Loading Spinner (async operations)
- Error Message (error display)

---

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Run end-to-end tests
npm run e2e
```

### Testing Tools
- Jasmine (testing framework)
- Karma (test runner)
- Cypress (E2E testing)

---

## 🚀 Deployment

### Prerequisites
- Node.js 18.19.1 or higher
- npm 10.2.4 or higher

### Build Process

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Build production bundle
npm run build

# Serve production build locally
npm run serve:prod
```

### Environment Variables

Create `.env` files for each environment:

**Development (.env.development)**:
```
NG_APP_API_URL=http://localhost:3001
NG_APP_LANGUAGE=pt-PT
```

**Production (.env.production)**:
```
NG_APP_API_URL=https://api.lojaafricanarosa.pt
NG_APP_LANGUAGE=pt-PT
```

### Docker Deployment

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["http-server", "dist/web-shop", "-p", "3000"]
```

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ Lazy-loaded feature modules
- ✅ OnPush change detection strategy ready
- ✅ HTTP request caching with Angular interceptors
- ✅ Image lazy-loading with IntersectionObserver

### Future Optimizations
- [ ] Virtual scrolling for product lists
- [ ] Image optimization (WebP, srcset)
- [ ] Code splitting and dynamic imports
- [ ] Service Worker for PWA
- [ ] Bundle size analysis

---

## 🐛 Debugging

### Redux DevTools
NgRx Store comes with Redux DevTools integration in development:

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension)
2. Open browser DevTools → Redux tab
3. Inspect actions, state changes, and time-travel debugging

### Console Logging
```typescript
// Enable verbose logging
localStorage.setItem('debug', 'app:*');

// Disable logging
localStorage.removeItem('debug');
```

---

## 📚 Additional Resources

### Documentation
- [Angular Documentation](https://angular.io/docs)
- [NgRx Documentation](https://ngrx.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ngx-translate Documentation](https://github.com/ngx-translate/core)

### Project Documentation
- [FRONTEND_IMPLEMENTATION_SUMMARY.md](../../FRONTEND_IMPLEMENTATION_SUMMARY.md) - Detailed feature breakdown
- [README.md](../../README.md) - Full project overview

---

## 👨‍💻 Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow Angular style guide
- Use OnPush change detection where possible
- Implement smart/dumb component pattern

### Naming Conventions
- Components: `*.component.ts`
- Services: `*.service.ts`
- Modules: `*.module.ts`
- Routing: `*-routing.module.ts`
- Store: `*.actions.ts`, `*.reducer.ts`, `*.selectors.ts`, `*.effects.ts`

### File Organization
```
feature/
├── pages/           # Page components (containers)
├── components/      # Reusable components (presentational)
├── services/        # HTTP and business logic services
├── models/          # TypeScript interfaces
├── feature.module.ts
└── feature-routing.module.ts
```

---

## 🔒 Security Best Practices

- ✅ JWT tokens in localStorage (plan to use httpOnly cookies in future)
- ✅ Automatic token refresh to prevent expiration
- ✅ HTTPS only in production
- ✅ XSS prevention with Angular sanitization
- ✅ CSRF token handling via interceptor
- ✅ Environment variable protection

---

## 📞 Support & Contact

**Developer**: Ginquel Moreira
**Company**: Limitless GMTech Solutions, Lda
**Email**: ginquel@limitlessgmtech.com
**Website**: https://www.upwork.com/freelancers/~012d1cf522c2961356

---

## 📄 License

MIT License - © 2025 Loja Africana Rosa

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0 (Foundation Complete)
