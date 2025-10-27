# 🚀 Quick Start - Building Your Figma Designs

**Your Figma File:** https://www.figma.com/design/Xyl5Or2EWoXqfBXgPrykCq/Loja-Africana-Rosa

**File ID:** `Xyl5Or2EWoXqfBXgPrykCq`

---

## 📋 What You Need To Do

You now have a **complete design specification** in `FIGMA_DESIGN_SPECIFICATION.md`.

Your task: **Build the designs in Figma following the specification.**

> **Don't worry!** I've created detailed specs so you can follow along step-by-step. It's like a recipe for design.

---

## ⚡ Quickest Way to Build (30 minutes)

### Option 1: Use Figma Templates/Community Files (Fastest)

1. Search Figma Community for templates matching:
   - "E-commerce product catalog"
   - "Mobile first UI kit"
   - "Tailwind CSS design system"

2. Import a template close to the spec
3. Customize colors, text, and content
4. Done! ✨

### Option 2: Build from Scratch (Structured)

Follow these exact steps in your Figma file:

#### **Step 1: Setup Pages** (5 min)
Create these pages in your Figma file:
- [ ] Page 1: "Design System"
- [ ] Page 2: "Components"
- [ ] Page 3: "Mobile Screens"
- [ ] Page 4: "Desktop Screens"

#### **Step 2: Design System** (10 min)
In the "Design System" page:

1. **Create a color palette section:**
   - Rectangle for each color from spec:
     - Primary: #B93B8F (label: "Primary")
     - Primary Dark: #8B2D6B (label: "Primary Dark")
     - Secondary: #D4AF37 (label: "Secondary")
     - Accent: #FF6B35 (label: "Accent")
     - Success: #10B981 (label: "Success")
     - Error: #EF4444 (label: "Error")
     - Neutral 50-900: (5 shades of gray)

   → Right-click each color → "Create color style" → Name it

2. **Create typography styles:**
   - Add text saying "Heading 1 - 36px Bold"
   - Right-click → "Create text style" → Name it "Heading 1"
   - Repeat for: Heading 2, Heading 3, Body Large, Body, Caption

3. **Create shadow styles:**
   - Create 3 rectangles with shadows (as per spec)
   - Right-click → "Create shadow style"

#### **Step 3: Build Core Components** (15 min)
In the "Components" page:

Create these components (frames) with variants:

**Button Component:**
```
Frame: Button/Primary/Medium
- Background: #B93B8F
- Text: "Click me" (14px, bold, white)
- Padding: 12px 20px
- Border radius: 8px
- Shadow: sm
```

Duplicate and create variants:
- Button/Primary/Medium (default, hover, disabled)
- Button/Secondary/Medium
- Button/Large

**ProductCard Component:**
```
Frame: ProductCard
- Width: 180px
- Background: white
- Border: 1px #E5E7EB
- Corner radius: 8px

Inside:
- Image placeholder (180x180, gray background)
- Text: "Product Name" (14px)
- Text: "€8,50" (16px bold, #B93B8F)
- Badge "PROMO -30%" (#FF6B35)
- Button: "Add to Cart"
```

**FilterDrawer Component:**
```
Frame: FilterDrawer (full mobile width 360px)
- Header: "X Filtros"
- Checkboxes for categories
- Price range slider (visual only)
- Action buttons: "Apply" | "Reset"
```

**Simple Input Component:**
```
Frame: Input/Text
- Background: #F9FAFB
- Border: 1px #E5E7EB
- Padding: 12px
- Placeholder text
- Focus state (blue border)
```

#### **Step 4: Build Screens** (10 min)
In the "Mobile Screens" page:

Create frames for each screen (360px width):

**Screen 1: Home Page**
```
Frame: Home (360x800)
- Header with logo + search + cart
- Hero banner (image placeholder)
- "Top Vendas" section with ProductCard instances
- "Categorias" section (5 category boxes)
- "Promoções" section with ProductCard instances
- Footer
```

**Screen 2: Product Catalog**
```
Frame: Catalog (360x800)
- Search bar
- Filter button
- "Results (24)" text
- ProductCard grid (2 columns)
- Load More button
```

**Screen 3: Product Detail**
```
Frame: ProductDetail (360x1000)
- Back button | Share button
- Large product image
- Category badge
- Product name (h2)
- Price section (original + promo)
- Description text
- Quantity stepper
- "Add to Cart" button (sticky bottom)
```

**Screen 4: Shopping Cart**
```
Frame: Cart (360x800)
- "Cart (2 items)" header
- Cart item rows:
  - Product image (small)
  - Name + quantity
  - Price + delete icon
- Subtotal summary
- "Go to Checkout" button
```

**Screen 5: Checkout**
```
Frame: Checkout (360x1000)
- "Checkout" header
- Form section (address fields)
- Delivery method options
- Payment method options
- Order summary (sticky bottom)
- "Place Order" button
```

---

## ✅ Validation Checklist

Before sharing with Claude Code:

- [ ] All 5 pages created
- [ ] Design system colors match spec
- [ ] Typography styles created
- [ ] All 6 components have variants
- [ ] All 5 mobile screens created
- [ ] Colors use design system colors (not random hex)
- [ ] Text uses text styles (not random sizes)
- [ ] Components are instances (not just copied frames)
- [ ] No typos in screen/component names

---

## 🎨 Design Tips

### Colors
Use the color picker in Figma to ensure consistency:
1. Create a solid color rectangle
2. Set fill to custom hex: #B93B8F
3. Save as style: "Primary"
4. Future components can reuse this color

### Components & Variants
Make reusable components:
1. Create a Button frame
2. Right-click → "Create component"
3. Duplicate for variants (hover, disabled)
4. Link variants in properties (Main: Button, Variant: State)
5. Use in screens as instances

### Consistency
- All buttons use same button component (consistency!)
- All text uses text styles (easy to update)
- All colors use color styles (easy to update)

### Mobile-First
- Start with 360px mobile screens
- Show responsive variants at 768px and 1024px if needed
- Design for touch (buttons ≥44px height)

---

## 🚀 Once You're Done Building

1. **Finalize your Figma file** with all designs
2. **Verify File ID:** `Xyl5Or2EWoXqfBXgPrykCq`
3. **Tell me when ready:** "Figma designs complete!"
4. **Then I'll:**
   - Extract design tokens via MCP Figma
   - Generate Angular components
   - Create production-ready code

---

## 📚 Reference

- **Spec:** `docs/design/FIGMA_DESIGN_SPECIFICATION.md`
- **MCP Integration:** `docs/deployment/MCP_FIGMA_INTEGRATION.md`
- **Feature Guide:** `docs/features/Guia_Site_LojaAfricanaRosa_atualizado_v2.md#8-mobile-first-figma--mcp--claude-code--frontend`

---

## 💡 Alternative: Hire a Designer

If you prefer, you can hire a Figma designer on Upwork to build these designs following the specification. Then you'll have professional designs ready for code generation.

**Estimated time:** 2-4 hours for a professional designer
**Cost:** $50-150 depending on designer experience

---

**Good luck! You've got this! 🚀**

Once designs are done, the code generation with Claude Code will be automatic.

---

*Questions? Check the specification document for detailed component and screen specs.*
