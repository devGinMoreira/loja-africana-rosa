# 📋 Copy Design System to Figma - Quick Guide

Your HTML design system is ready at: `apps/web-shop/src/design-system.html`

Open this file in your browser while building in Figma to reference exact colors, sizes, and layouts.

---

## 🎯 Quick Copy Process

### **Step 1: Open Both Windows**
1. Open `design-system.html` in your browser (left side)
2. Open Figma file in another window (right side)
3. Position them side-by-side for easy copying

---

### **Step 2: Create Pages in Figma**

Right-click on your file name in Figma → Add these pages:
- [ ] "Design System" (for tokens)
- [ ] "Components" (for reusable components)
- [ ] "Screens" (for mobile screens)

---

### **Step 3: Copy Colors to Figma**

In Figma → Go to "Design System" page

**From HTML, copy these colors:**
```
Primary: #B93B8F
Primary Dark: #8B2D6B
Secondary: #D4AF37
Accent: #FF6B35
Success: #10B981
Error: #EF4444
Neutral 50: #F9FAFB
Neutral 100: #F3F4F6
Neutral 200: #E5E7EB
Neutral 500: #6B7280
Neutral 900: #111827
```

**For each color:**
1. Draw a rectangle in Figma
2. Set fill to the hex code (copy-paste from above)
3. Right-click → "Create color style"
4. Name it exactly: `Color/Primary`, `Color/Accent`, etc.

**Time: 5 minutes** ✅

---

### **Step 4: Copy Typography to Figma**

In Figma → Still in "Design System" page

**From HTML, copy typography:**

1. Add text: "Heading 1"
   - Size: 36px
   - Weight: 700
   - Right-click → "Create text style" → Name: `Typography/Heading1`

2. Add text: "Heading 2"
   - Size: 30px
   - Weight: 700
   - Create style → `Typography/Heading2`

3. Add text: "Heading 3"
   - Size: 24px
   - Weight: 600
   - Create style → `Typography/Heading3`

4. Add text: "Body Large"
   - Size: 16px
   - Weight: 400
   - Create style → `Typography/BodyLarge`

5. Add text: "Body"
   - Size: 14px
   - Weight: 400
   - Create style → `Typography/Body`

6. Add text: "Caption"
   - Size: 12px
   - Weight: 500
   - Create style → `Typography/Caption`

**Time: 5 minutes** ✅

---

### **Step 5: Build Components (Go to "Components" page)**

#### **Button Component**

In HTML, look at the "Buttons" section.

In Figma:
1. Create a frame: 100px × 40px
2. Set background: Use `Color/Primary` style (#B93B8F)
3. Set corner radius: 8px
4. Add text inside: "Button"
   - Font: Use `Typography/Body` style
   - Color: white
   - Centered
5. Right-click frame → "Create component"
6. Name it: `Button/Primary/Medium`

**Create variants:**
- Duplicate → Name: `Button/Primary/Medium - Hover`
  - Change background to `Color/Primary-Dark`
- Duplicate → Name: `Button/Secondary/Medium`
  - Change background to `Color/Neutral-100`
  - Change text color to `Color/Neutral-900`
  - Add border: 1px `Color/Neutral-200`

**Time: 10 minutes** ✅

---

#### **ProductCard Component**

In HTML, look at "Product Card Component" section.

In Figma:
1. Create a frame: 180px × 220px
2. Background: white
3. Border: 1px `Color/Neutral-200`
4. Corner radius: 8px
5. Inside the frame, add:
   - Rectangle (product image): 180px × 180px, background `Color/Neutral-100`
   - Text "Mercearia" (12px, caption style, `Color/Neutral-500`)
   - Text "Feijão Preto" (14px, heading 3)
   - Text "€8,50" (14px, bold, `Color/Primary`)
   - Button: Use your Button/Primary/Medium component

6. Right-click frame → "Create component"
7. Name it: `ProductCard`

**Create variants:**
- Duplicate → Add badge "-30%"
  - Orange badge (`Color/Accent`)
  - Crossed-out original price
  - New price in `Color/Accent`
- Duplicate → Add badge "TOP"
  - Magenta badge (`Color/Primary`)

**Time: 15 minutes** ✅

---

#### **Input Field Component**

In HTML, look at "Input Fields" section.

In Figma:
1. Create a rectangle: 240px × 40px
2. Background: `Color/Neutral-50`
3. Border: 1px `Color/Neutral-200`
4. Corner radius: 4px
5. Add placeholder text inside (gray color)
6. Right-click → "Create component"
7. Name it: `Input/Text`

**Create variants:**
- Focus state: Border color `Color/Primary`
- Error state: Border color `Color/Error`
- Disabled: Background `Color/Neutral-100`, opacity 50%

**Time: 10 minutes** ✅

---

### **Step 6: Build Screens (Go to "Screens" page)**

#### **Home Screen**

In HTML, look at "Home Page" under "Mobile Screens Preview".

In Figma:
1. Create a frame: 360px × 1200px
2. Name it: "Home"
3. Build inside:
   - Header (360px × 50px, background `Color/Primary`, text "Loja Africana Rosa" white)
   - Search bar (use Input/Text component)
   - "Top Vendas" heading
   - 2×2 grid of ProductCard components (use instances)
   - "Categorias" section with 4 category boxes
   - Footer

**Reference:** Look at HTML preview to match layout exactly

**Time: 15 minutes** ✅

---

#### **Cart Screen**

In HTML, look at "Shopping Cart" under "Mobile Screens Preview".

In Figma:
1. Create a frame: 360px × 800px
2. Name it: "Cart"
3. Build inside:
   - Header (Cart)
   - Cart item rows (with product name, quantity, price)
   - Subtotal/Delivery/Total section
   - Checkout button (use Button component)

**Time: 10 minutes** ✅

---

### **Step 7: Add More Screens (Optional)**

Create additional screens for:
- Product Catalog
- Product Detail
- Checkout

Each following the same pattern:
- Frame 360px width
- Use component instances
- Reference HTML for layout

**Time: 20-30 minutes** ✅

---

## ⏱️ Total Time Estimate

| Task | Time |
|------|------|
| Copy colors to Figma | 5 min |
| Copy typography to Figma | 5 min |
| Create Button component | 10 min |
| Create ProductCard component | 15 min |
| Create Input component | 10 min |
| Build Home screen | 15 min |
| Build Cart screen | 10 min |
| **Total** | **~70 minutes** |

---

## 📋 Copy Checklist

### Design System
- [ ] 11 colors created as color styles
- [ ] 6 typography styles created
- [ ] Colors match hex codes exactly
- [ ] Fonts match sizes and weights

### Components
- [ ] Button component created with variants
- [ ] ProductCard component created with variants
- [ ] Input component created with states
- [ ] All components use design system colors/typography

### Screens
- [ ] Home screen built (360px × 1200px)
- [ ] Cart screen built (360px × 800px)
- [ ] All screens use component instances (not copies)
- [ ] Layout matches HTML preview exactly

---

## 🔍 Verification

After copying to Figma:
1. **Colors** - Every color is a style (not manual hex)
2. **Typography** - Every text uses a style (not manual sizes)
3. **Components** - Used as instances in screens
4. **Responsive** - All screens are 360px mobile width
5. **Consistent** - Same colors/fonts throughout

---

## 🎯 Reference While Building

**Keep these open side-by-side:**
1. **HTML Design System:** `apps/web-shop/src/design-system.html` (in browser)
2. **Figma File:** https://www.figma.com/design/Xyl5Or2EWoXqfBXgPrykCq/Loja-Africana-Rosa
3. **This Guide:** For copy/paste values and instructions

---

## 💡 Pro Tips

1. **Create styles first** - All colors and typography before building components
2. **Test components** - Duplicate a component to make sure it works
3. **Use copy-paste for hex codes** - Prevent typos
4. **Reference HTML** - Match layouts exactly
5. **Name consistently** - Use same names as listed above

---

## ✅ When Done

Once Figma has:
- ✅ 11 color styles
- ✅ 6 typography styles
- ✅ 3 components (Button, ProductCard, Input)
- ✅ 2-5 screens built

**Tell me:** "Figma design system complete!"

Then I will:
1. Extract your Figma design via MCP
2. Generate Angular components automatically
3. Create your complete frontend code

---

**Ready? Open `design-system.html` in browser and start copying!** 🚀
