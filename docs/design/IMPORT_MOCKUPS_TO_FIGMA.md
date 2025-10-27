# 📥 Import Design Mockups to Figma - Step-by-Step Guide

**Your Figma File:** https://www.figma.com/design/Xyl5Or2EWoXqfBXgPrykCq/Loja-Africana-Rosa

**File ID:** `Xyl5Or2EWoXqfBXgPrykCq`

---

## 📂 Mockup Files Ready

All design mockup PNG files are located in: `mcpollinations-output/`

Files to import:
- `home-page-mobile.png` (37 KB)
- `catalog-page-mobile.png` (51 KB)
- `product-detail-mobile.png` (26 KB)
- `cart-page-mobile.png` (22 KB)
- `checkout-page-mobile.png` (24 KB)
- `admin-dashboard-desktop.png` (35 KB)
- `component-library.png` (36 KB)
- `design-system-reference.png` (31 KB)

---

## 🚀 Quick Import Process (15 minutes)

### Step 1: Create Pages in Figma

1. Open your Figma file: https://www.figma.com/design/Xyl5Or2EWoXqfBXgPrykCq/Loja-Africana-Rosa
2. On the left sidebar, right-click on the file name
3. Create these pages:
   - [ ] "Design System" (for design tokens reference)
   - [ ] "Mobile Mockups" (for all mobile screens)
   - [ ] "Desktop Mockups" (for admin dashboard)
   - [ ] "Components" (for component library)
   - [ ] "Mobile Screens" (for actual screens you'll build)

### Step 2: Import Design System Reference

1. Click on "Design System" page
2. File > Import → Select `design-system-reference.png`
3. Place it on the canvas
4. Label it: "Design System Tokens - Reference"
5. Use this page as your design reference (don't modify)

### Step 3: Import Mobile Mockups

1. Click on "Mobile Mockups" page
2. File > Import → Select the mobile PNG files one by one:
   - `home-page-mobile.png`
   - `catalog-page-mobile.png`
   - `product-detail-mobile.png`
   - `cart-page-mobile.png`
   - `checkout-page-mobile.png`
3. Arrange them in a grid for easy reference
4. Label each one

### Step 4: Import Desktop & Components

1. Click on "Desktop Mockups" page
2. File > Import → Select `admin-dashboard-desktop.png`

1. Click on "Components" page
2. File > Import → Select `component-library.png`

---

## 🎨 Build Design System (30 minutes)

Now you'll create the actual design system using the mockups as reference.

### Step 1: Create Color Styles

In the "Design System" page:

1. **Create a color palette section**
2. Draw rectangles for each color:
   - Primary: #B93B8F
   - Primary Dark: #8B2D6B
   - Secondary: #D4AF37
   - Accent: #FF6B35
   - Success: #10B981
   - Error: #EF4444
   - Neutral 50: #F9FAFB
   - Neutral 100: #F3F4F6
   - Neutral 200: #E5E7EB
   - Neutral 500: #6B7280
   - Neutral 900: #111827

3. For each color rectangle:
   - Right-click → "Create color style"
   - Name it: "Color/Primary", "Color/Accent", etc.
   - Done! ✅

### Step 2: Create Typography Styles

1. Add text examples in "Design System" page:
   - "Heading 1" (36px, weight 700)
   - "Heading 2" (30px, weight 700)
   - "Heading 3" (24px, weight 600)
   - "Body Large" (16px, weight 400)
   - "Body" (14px, weight 400)
   - "Caption" (12px, weight 500)

2. For each text:
   - Select the text
   - Right-click → "Create text style"
   - Name it: "Typography/Heading1", etc.
   - Done! ✅

### Step 3: Create Button Component

In the "Components" page:

1. Create a frame: "Button/Primary/Medium"
   - Width: 100px
   - Height: 40px
   - Background: #B93B8F
   - Corner radius: 8px

2. Add text inside:
   - Text: "Button"
   - Color: white
   - Font: 14px, weight 600

3. Right-click the frame → "Create component"

4. Create variants:
   - Duplicate and name: "Button/Primary/Medium - Hover"
   - Change background to #8B2D6B
   - Link to main component as variant

5. Do the same for:
   - Button/Secondary/Medium
   - Button/Large
   - Button/Small

### Step 4: Create ProductCard Component

1. Create frame: "ProductCard"
   - Width: 180px
   - Height: 220px
   - Background: white
   - Border: 1px #E5E7EB
   - Corner radius: 8px

2. Inside the frame:
   - Image placeholder (180x180, gray background)
   - Text: "Product Name" (14px)
   - Text: "€8,50" (16px, bold, #B93B8F)
   - Badge: "PROMO" (#FF6B35)
   - Button: "Add to Cart" (using Button component)

3. Right-click → "Create component"

### Step 5: Create Input Component

1. Create frame: "Input/Text"
   - Width: 240px
   - Height: 40px
   - Background: #F9FAFB
   - Border: 1px #E5E7EB
   - Corner radius: 4px

2. Add placeholder text inside
3. Create variants for states:
   - Focus (blue border)
   - Error (red border)
   - Disabled (gray background)

4. Right-click → "Create component"

---

## 🖼️ Build Mobile Screens (45 minutes)

Now build actual screens using the components you created.

### In "Mobile Screens" Page:

#### Screen 1: Home Page
1. Create frame: 360x1200
2. Build from mockup reference:
   - Header with logo + search (use Input component)
   - Hero banner
   - "Top Vendas" section → use ProductCard component instances
   - "Categorias" section → create category boxes
   - Footer

#### Screen 2: Product Catalog
1. Create frame: 360x1000
2. Search bar (use Input component)
3. Filter button (use Button component)
4. Product grid (use ProductCard component instances)
5. Pagination buttons

#### Screen 3: Product Detail
1. Create frame: 360x1000
2. Header with back button
3. Large product image
4. Product info
5. Price section
6. Add to Cart button (use Button component)

#### Screen 4: Shopping Cart
1. Create frame: 360x900
2. Cart item list (cards showing items)
3. Summary section
4. Checkout button (use Button component)

#### Screen 5: Checkout
1. Create frame: 360x1100
2. Address form (use Input components)
3. Delivery options (radio buttons)
4. Payment options
5. Order summary
6. Place Order button (use Button component)

---

## ✅ Verification Checklist

Before moving to code generation:

- [ ] Design System page has all color styles created
- [ ] Design System page has all typography styles created
- [ ] Button component created with variants
- [ ] ProductCard component created
- [ ] Input component created
- [ ] All 5 mobile screens built
- [ ] All screens use component instances (not copies)
- [ ] Colors use color styles (not random hex)
- [ ] Text uses text styles (not random sizes)
- [ ] All interactive elements have correct styling
- [ ] Mobile screens are 360px width
- [ ] Admin dashboard imported as reference

---

## 🎯 Time Estimate

| Task | Time |
|------|------|
| Import mockups to Figma | 5 min |
| Create design system (colors, typography) | 15 min |
| Create 3-4 core components (Button, Card, Input) | 15 min |
| Build 5 mobile screens | 45 min |
| Verification & polish | 10 min |
| **Total** | **~90 minutes** |

---

## 📱 Pro Tips

1. **Use the mockup images as guides** - Don't try to replicate perfectly, just match the layout and key elements

2. **Create components first** - Once components are done, building screens is just placing instances

3. **Use design tokens** - Apply color styles and text styles consistently (not manual hex codes)

4. **Group elements logically** - Group related elements (header, content, footer) for easier organization

5. **Name everything clearly** - Screens: "Home", "Catalog", etc. Components: "Button/Primary/Medium"

6. **Test responsiveness** - Once built, you can create tablet (768px) and desktop (1024px) variants

---

## 🚀 After Screens Are Built

Once your Figma file is complete with:
- ✅ Design System (colors, typography)
- ✅ Components (Button, ProductCard, Input, etc.)
- ✅ 5 Mobile screens

Then I can:
1. Configure `.env` with your Figma File ID
2. Use MCP Figma to extract design tokens
3. Generate Angular components automatically
4. Create production-ready code with Tailwind CSS

---

## ❓ Need Help?

**Figma Tips:**
- Right-click on elements for options
- Use "+" button to add new pages
- Components are created with right-click → "Create component"
- Instances are used in screens (Cmd/Ctrl + D to duplicate)

**Mockup Reference:**
- Open `mcpollinations-output/` folder to view PNG files
- Use them side-by-side with Figma while building

---

**Ready to build?** 🎨

Follow these steps in order, and you'll have a professional design system in Figma ready for code generation!

Once done, let me know and I'll extract the designs and generate your Angular components. 🚀
