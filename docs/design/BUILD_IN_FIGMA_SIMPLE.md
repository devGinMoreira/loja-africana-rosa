# 🎨 Build Design in Figma - Simple Guide

**Your Figma File:** https://www.figma.com/design/Xyl5Or2EWoXqfBXgPrykCq/Loja-Africana-Rosa

**Mockups Reference:** `mcpollinations-output/` folder (open these images while building)

---

## ⚡ Quick Start - 5 Simple Steps

### **Step 1: Create Pages (2 min)**

In your Figma file, create these pages:
1. "Design System"
2. "Mobile Screens"
3. "Components"

Right-click on file → "Create new page"

---

### **Step 2: Design System Page - Add Colors (5 min)**

In the "Design System" page:

1. **Create a rectangle** (use Rectangle tool)
2. **Set fill color to:** `#B93B8F` (primary magenta)
3. **Right-click the rectangle** → "Create color style"
4. **Name it:** `Color/Primary`
5. **Repeat for these colors:**
   - `#8B2D6B` → `Color/Primary-Dark`
   - `#D4AF37` → `Color/Secondary`
   - `#FF6B35` → `Color/Accent`
   - `#10B981` → `Color/Success`
   - `#EF4444` → `Color/Error`
   - `#F9FAFB` → `Color/Neutral-50`
   - `#F3F4F6` → `Color/Neutral-100`
   - `#E5E7EB` → `Color/Neutral-200`
   - `#6B7280` → `Color/Neutral-500`
   - `#111827` → `Color/Neutral-900`

**Done!** You now have 11 color styles. ✅

---

### **Step 3: Design System Page - Add Typography (5 min)**

In the same "Design System" page:

1. **Create text that says:** "Heading 1"
2. **Set font size to:** `36px`
3. **Set font weight to:** `700` (Bold)
4. **Right-click the text** → "Create text style"
5. **Name it:** `Typography/Heading1`

**Repeat for:**
- "Heading 2" → 30px, 700 weight → `Typography/Heading2`
- "Heading 3" → 24px, 600 weight → `Typography/Heading3`
- "Body Large" → 16px, 400 weight → `Typography/BodyLarge`
- "Body" → 14px, 400 weight → `Typography/Body`
- "Caption" → 12px, 500 weight → `Typography/Caption`

**Done!** You now have 6 typography styles. ✅

---

### **Step 4: Create Components Page - Build Button (5 min)**

In the "Components" page:

1. **Create a rectangle** (tool → Rectangle)
2. **Set width:** 100px, **height:** 40px
3. **Set fill color:** Use your `Color/Primary` style (click color → select from styles)
4. **Set corner radius:** 8px
5. **Add text inside:** "Button"
   - Font size: 14px
   - Weight: 600
   - Color: white
6. **Select the rectangle** (the whole thing)
7. **Right-click** → "Create component"
8. **Name it:** `Button/Primary/Medium`

**Done!** You created your first component! ✅

---

### **Step 5: Create a Screen (10 min)**

In the "Mobile Screens" page:

1. **Create a frame** (Frame tool)
2. **Set width:** 360px, **height:** 800px
3. **Name it:** "Home"

**Build the home screen:**
- Add a header rectangle at top (use `Color/Primary`)
- Add search bar (rectangle with text)
- Add hero image placeholder (rectangle, gray background)
- Add "TOP VENDAS" heading (use text style `Typography/Heading2`)
- Add 4 product cards (each is a smaller rectangle)
  - Inside each: product image (gray box), name (text), price (text), "Add to Cart" button
  - Use your Button component for the button!

**Look at mockup:** Open `home-page-mobile.png` to see what it should look like

**Done!** You created your first screen! ✅

---

## 🎯 That's It!

You now know how to:
✅ Create color styles (design tokens)
✅ Create typography styles (text styles)
✅ Create components (reusable UI elements)
✅ Build screens (using components)

---

## 📋 Repeat This For:

**Create more components (optional but recommended):**
- ProductCard component
- Input component
- Simple button variants (Secondary, Large, Small)

**Create more screens:**
- Catalog page (use `catalog-page-mobile.png` as reference)
- Product Detail page
- Cart page
- Checkout page

**Open mockups side-by-side:** While building, keep the PNG mockup open to see what it should look like.

---

## ⏱️ Time Breakdown

| Task | Time |
|------|------|
| Step 1: Create pages | 2 min |
| Step 2: Add colors | 5 min |
| Step 3: Add typography | 5 min |
| Step 4: Create button | 5 min |
| Step 5: Create home screen | 10 min |
| **Subtotal** | **27 min** |
| Build remaining screens (4 more) | 40 min |
| Build more components | 20 min |
| **TOTAL** | **~90 min** |

---

## 🚀 After You're Done

Once you have in Figma:
1. ✅ Colors created (color styles)
2. ✅ Typography created (text styles)
3. ✅ Components created (Button, Card, etc.)
4. ✅ Screens built (Home, Catalog, Detail, Cart, Checkout)

**Tell me:** "Figma designs complete!"

Then I will:
- Extract your design tokens from Figma via MCP Figma
- Generate Angular components automatically
- Create your complete frontend with Tailwind CSS

---

## 💡 Pro Tips

1. **Use mockups as reference** - Open the PNG while building to match the layout
2. **Use color styles** - Don't type hex codes manually, select from your created styles
3. **Use text styles** - Don't manually set font size, select from your created styles
4. **Copy components** - Once Button is done, duplicate it for variants (Secondary, Large, etc.)
5. **Use instances** - In screens, drag components from your component library, don't copy/paste

---

## ✅ Figma Tips

**To create styles:**
- Right-click element → "Create [color/text] style"

**To use styles:**
- Click on element
- In right panel, click color/text
- Select "Style" tab
- Choose your created style

**To create components:**
- Select element
- Right-click → "Create component"
- It appears in Assets panel

**To use components:**
- Drag from Assets panel onto canvas
- Or right-click → "Insert component"

---

## 🎨 Color Codes (Copy-Paste Ready)

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

---

**Start now! Follow steps 1-5 above, then open mockups to build more screens.**

**Questions?** Check `IMPORT_MOCKUPS_TO_FIGMA.md` for more detailed instructions.

**Ready?** Let's build! 🚀
