# 🎨 Design System - Loja Africana Rosa

Welcome to the design system documentation for Loja Africana Rosa e-commerce platform.

---

## 📋 What's in This Folder

### **1. Design Specification**
- **[FIGMA_DESIGN_SPECIFICATION.md](./FIGMA_DESIGN_SPECIFICATION.md)** - Complete design system specs
  - Color palette (11 colors)
  - Typography system (6 styles)
  - Spacing system (8px grid)
  - Component specifications
  - Screen layouts and requirements
  - Design tokens for CSS generation

### **2. Design Mockups**
- **[DESIGN_MOCKUPS_SUMMARY.md](./DESIGN_MOCKUPS_SUMMARY.md)** - Overview of generated mockups
  - 5 mobile screens (360px)
  - 1 desktop screen (1024px)
  - Component library
  - Design system reference
  - All mockups ready in `mcpollinations-output/` folder

### **3. Implementation Guide**
- **[IMPORT_MOCKUPS_TO_FIGMA.md](./IMPORT_MOCKUPS_TO_FIGMA.md)** - Step-by-step Figma setup guide
  - How to import mockups
  - Create design system (colors, typography)
  - Build components (Button, Card, Input)
  - Build mobile screens
  - Time estimates and checklist

### **4. Quick Start**
- **[QUICK_START_FIGMA.md](./QUICK_START_FIGMA.md)** - Quick reference for building

---

## 🎯 Current Status

### ✅ Completed
- [x] Design specification document (all tokens, components, screens)
- [x] Professional UI mockups (8 screens/references)
- [x] Design system reference (colors, typography, spacing)
- [x] Component library mockups
- [x] Step-by-step Figma implementation guide

### ⏳ In Progress (Your Action)
- [ ] Import mockups into Figma
- [ ] Build design system in Figma (colors, typography styles)
- [ ] Create components (Button, ProductCard, Input, etc.)
- [ ] Build 5 mobile screens

### 🚀 Next Steps (After Figma)
- [ ] Configure `.env` with FIGMA_FILE_ID
- [ ] Test MCP Figma connection
- [ ] Extract design tokens
- [ ] Generate Angular components via Claude Code

---

## 🚀 Quick Start - Get Going in 90 Minutes

### **Step 1: Import Mockups (5 min)**
1. Open your Figma file: https://www.figma.com/design/Xyl5Or2EWoXqfBXgPrykCq/Loja-Africana-Rosa
2. Download PNG files from `mcpollinations-output/`
3. Import them into Figma pages for reference

### **Step 2: Build Design System (15 min)**
1. Create color styles (11 colors)
2. Create text styles (6 typography scales)
3. Done! Now you have design tokens

### **Step 3: Build Components (30 min)**
1. Create Button component (with variants)
2. Create ProductCard component
3. Create Input component
4. Done! Now you have reusable components

### **Step 4: Build Screens (45 min)**
1. Home page (using components)
2. Product catalog
3. Product detail
4. Shopping cart
5. Checkout

### **Done! ✅**
Your Figma file is ready for code generation.

---

## 📂 Folder Structure

```
docs/design/
├── README.md (this file)
├── FIGMA_DESIGN_SPECIFICATION.md (complete design system specs)
├── DESIGN_MOCKUPS_SUMMARY.md (overview of generated mockups)
├── IMPORT_MOCKUPS_TO_FIGMA.md (step-by-step guide)
├── QUICK_START_FIGMA.md (quick reference)
└── (mockup files are in: mcpollinations-output/)
```

---

## 🎨 Design System Overview

### Color Palette
- **Primary:** #B93B8F (Magenta - African-inspired brand color)
- **Primary Dark:** #8B2D6B (For hover/active states)
- **Secondary:** #D4AF37 (Gold - Premium feel)
- **Accent:** #FF6B35 (Orange - Promotional elements)
- **Success:** #10B981 (Green - Success states)
- **Error:** #EF4444 (Red - Error states)
- **Neutrals:** 5 shades of gray (#F9FAFB to #111827)

### Typography
- **Heading 1:** 36px, weight 700
- **Heading 2:** 30px, weight 700
- **Heading 3:** 24px, weight 600
- **Body Large:** 16px, weight 400
- **Body:** 14px, weight 400
- **Caption:** 12px, weight 500

### Components
- **Button** - Primary, Secondary, Ghost, Danger variants in 3 sizes
- **ProductCard** - Product display with image, price, badge, CTA
- **Input** - Text input with states (default, focus, error, disabled)
- **FilterDrawer** - Category and price filters
- **CheckoutSheet** - Order summary component

### Screens
- **Home Page** - Featured products and categories
- **Catalog** - Search, filter, product grid
- **Product Detail** - Image, description, price, add to cart
- **Cart** - Items, totals, checkout CTA
- **Checkout** - Address, delivery, payment forms
- **Admin Dashboard** - KPIs, orders, management

---

## 🔗 Related Documentation

- **MCP Figma Integration:** `docs/deployment/MCP_FIGMA_INTEGRATION.md`
- **Feature Guide (Section 8):** `docs/features/Guia_Site_LojaAfricanaRosa_atualizado_v2.md`
- **Architecture Decisions:** `docs/architecture/`
- **Deployment:** `docs/deployment/`

---

## 📖 How to Use This Design System

### For Designers
1. Start with `FIGMA_DESIGN_SPECIFICATION.md`
2. Follow `IMPORT_MOCKUPS_TO_FIGMA.md` to build in Figma
3. Use mockups as visual references (in `mcpollinations-output/`)

### For Developers
1. Check `FIGMA_DESIGN_SPECIFICATION.md` for component specs
2. Wait for MCP Figma to extract design tokens
3. Use generated Angular components
4. Reference this design system for styling

### For Stakeholders
1. See `DESIGN_MOCKUPS_SUMMARY.md` for design overview
2. View mockup PNGs to understand UX/UI

---

## ✨ Design Principles

1. **Mobile-First** - All designs start at 360px (mobile)
2. **Consistent** - Reusable components across all screens
3. **Accessible** - Clear hierarchy, sufficient contrast
4. **Fast** - Optimized for mobile performance
5. **African-Inspired** - Warm, vibrant colors reflecting brand identity
6. **E-Commerce Optimized** - Product showcase, smooth checkout flow

---

## 🎯 Goals

✅ Create professional, production-ready designs
✅ Enable fast development via component-based system
✅ Ensure consistency across frontend and backend
✅ Support responsive design (mobile, tablet, desktop)
✅ Facilitate automated code generation via Claude Code + MCP Figma
✅ Maintain design-to-code alignment throughout development

---

## 🚀 Next Actions

1. **Read:** `IMPORT_MOCKUPS_TO_FIGMA.md` (step-by-step guide)
2. **Download:** PNG mockups from `mcpollinations-output/`
3. **Build:** Figma design system following the guide (~90 minutes)
4. **Notify:** Tell Claude Code when Figma is ready
5. **Generate:** Automatic Angular component generation!

---

## ❓ Questions?

Check the relevant guide:
- **"How do I build this in Figma?"** → `IMPORT_MOCKUPS_TO_FIGMA.md`
- **"What are the design specs?"** → `FIGMA_DESIGN_SPECIFICATION.md`
- **"What mockups were generated?"** → `DESIGN_MOCKUPS_SUMMARY.md`
- **"How do I integrate with code?"** → `docs/deployment/MCP_FIGMA_INTEGRATION.md`

---

**Design System Status:** 🟢 Ready for Figma Build
**Design Assets:** 8 mockups generated and ready
**Estimated Build Time:** 90 minutes
**Target:** Production-ready Figma file → Auto-generated Angular components

---

*Loja Africana Rosa Design System - Built with professional design standards and optimized for code generation via Claude Code + MCP Figma.*
