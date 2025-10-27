# 🎨 Figma Design Specification - Loja Africana Rosa

**Status:** Design System & Core Screens Specification
**File ID:** `Xyl5Or2EWoXqfBXgPrykCq`
**Mobile-First Breakpoints:** 360px (mobile), 768px (tablet), 1024px (desktop)
**Design Tool:** Figma with Tailwind CSS + Design Tokens

---

## 📋 Design System

### Color Palette

| Color | Hex | RGB | Usage | Notes |
|-------|-----|-----|-------|-------|
| **Primary** | `#B93B8F` | 185, 59, 143 | Primary CTA, highlights, badges | Warm magenta/rose |
| **Primary Dark** | `#8B2D6B` | 139, 45, 107 | Hover states, active states | Darker rose |
| **Secondary** | `#D4AF37` | 212, 175, 55 | Accents, premium items | Gold (African theme) |
| **Accent** | `#FF6B35` | 255, 107, 53 | Promo badges, alerts | Vibrant orange |
| **Success** | `#10B981` | 16, 185, 129 | Success messages, available | Green |
| **Error** | `#EF4444` | 239, 68, 68 | Error states, stock-out | Red |
| **Neutral 50** | `#F9FAFB` | 249, 250, 251 | Backgrounds, hover state | Almost white |
| **Neutral 100** | `#F3F4F6` | 243, 244, 246 | Light backgrounds | Very light gray |
| **Neutral 200** | `#E5E7EB` | 229, 231, 235 | Borders, dividers | Light gray |
| **Neutral 500** | `#6B7280` | 107, 114, 128 | Body text, secondary | Medium gray |
| **Neutral 900** | `#111827` | 17, 24, 39 | Primary text, headings | Dark gray/black |

### Typography System

```
Scale: 12, 14, 16, 18, 20, 24, 30, 36px

Heading 1 (h1):
  - Size: 36px
  - Weight: 700 (Bold)
  - Line height: 44px (1.22)
  - Letter spacing: -0.02em
  - Usage: Page titles, hero section

Heading 2 (h2):
  - Size: 30px
  - Weight: 700 (Bold)
  - Line height: 36px (1.2)
  - Letter spacing: -0.01em
  - Usage: Section titles, category headers

Heading 3 (h3):
  - Size: 24px
  - Weight: 600 (Semibold)
  - Line height: 32px (1.33)
  - Letter spacing: 0
  - Usage: Card titles, subsections

Body Text (Large):
  - Size: 16px
  - Weight: 400 (Regular)
  - Line height: 24px (1.5)
  - Letter spacing: 0
  - Usage: Product descriptions, body copy

Body Text (Regular):
  - Size: 14px
  - Weight: 400 (Regular)
  - Line height: 20px (1.43)
  - Letter spacing: 0
  - Usage: Standard body text, captions

Caption:
  - Size: 12px
  - Weight: 500 (Medium)
  - Line height: 16px (1.33)
  - Letter spacing: 0.02em
  - Usage: Labels, hints, timestamps

Button Text:
  - Size: 14px
  - Weight: 600 (Semibold)
  - Line height: 20px
  - Letter spacing: 0.02em
  - Usage: Button labels, CTAs
```

**Font Families:**
- **Primary (UI):** Inter, Segoe UI, system font
- **Headings (Premium look):** Poppins or Sora (optional, for brand personality)
- **Monospace:** JetBrains Mono (admin/pricing displays)

### Spacing System (8px Grid)

```
4px   - Micro spacing (between elements)
8px   - XS (tight spacing)
12px  - SM (small spacing)
16px  - MD (default spacing)
24px  - LG (large spacing)
32px  - XL (extra large)
48px  - 2XL (section spacing)
64px  - 3XL (major sections)
```

### Shadows

```
Elevation 0 (Flat):
  - No shadow

Elevation 1 (Subtle):
  - X: 0px
  - Y: 1px
  - Blur: 2px
  - Spread: 0px
  - Color: rgba(0,0,0,0.05)

Elevation 2 (Card):
  - X: 0px
  - Y: 4px
  - Blur: 6px
  - Spread: -2px
  - Color: rgba(0,0,0,0.07)

Elevation 3 (Modal):
  - X: 0px
  - Y: 20px
  - Blur: 25px
  - Spread: -5px
  - Color: rgba(0,0,0,0.1)
```

### Border Radius

```
0px    - Sharp (no radius)
4px    - SM (small buttons, inputs)
8px    - MD (cards, larger elements)
12px   - LG (modals, larger cards)
999px  - Full (pills, avatars)
```

---

## 🧩 Component Library

### 1. Button Component

**Variants:**
- Primary (default)
- Secondary
- Ghost
- Danger

**Sizes:**
- Small (32px height, 12px font)
- Medium (40px height, 14px font)
- Large (48px height, 16px font)

**States:**
- Default
- Hover
- Active
- Disabled
- Loading

**Specifications:**

```
Button/Primary/Medium (Default State):
  - Background: #B93B8F
  - Text Color: #FFFFFF
  - Padding: 12px 20px
  - Border: None
  - Border Radius: 8px
  - Font: 600, 14px
  - Shadow: Elevation 1
  - Transition: all 200ms ease

Button/Primary/Medium (Hover State):
  - Background: #8B2D6B
  - Shadow: Elevation 2
  - Transform: translateY(-1px)

Button/Secondary/Medium:
  - Background: #F3F4F6
  - Text Color: #111827
  - Border: 1px solid #E5E7EB

Button/Ghost/Medium:
  - Background: transparent
  - Text Color: #B93B8F
  - Border: 1px solid #D4AF37
```

### 2. ProductCard Component

**Dimensions:** 180px width (mobile grid), 240px (tablet)

**Structure:**
```
┌─────────────────┐
│   Image (1:1)   │  ← 180px × 180px
├─────────────────┤
│ Category Badge  │  ← Optional: "Top Venda", "Promo -30%"
│                 │
│ Product Name    │  ← 2 lines max, truncate
│ €8,50           │  ← Price with €
│ ~~€12,00~~      │  ← Strikethrough if promo
├─────────────────┤
│ Add to Cart Btn │  ← Sticky to bottom on detail page
└─────────────────┘
```

**Specifications:**

```
ProductCard/Default:
  - Background: #FFFFFF
  - Border: 1px solid #E5E7EB
  - Border Radius: 8px
  - Padding: 12px
  - Shadow: Elevation 1
  - Hover: Elevation 2, translateY(-2px)

ProductCard/Image:
  - Aspect Ratio: 1:1
  - Object-fit: cover
  - Background: #F3F4F6 (while loading)

ProductCard/Badge (Promo):
  - Background: #FF6B35
  - Text: #FFFFFF
  - Padding: 4px 8px
  - Border Radius: 4px
  - Font: 600, 12px
  - Position: Absolute top-right

ProductCard/Badge (Top Venda):
  - Background: #B93B8F
  - Text: "TOP"
  - Font: 700, 12px

ProductCard/Price (Normal):
  - Color: #111827
  - Font: 700, 16px

ProductCard/Price (Promo):
  - Color: #FF6B35
  - Font: 700, 18px
  - Text-decoration: none (on promo price)

ProductCard/Price (Original - Promo):
  - Color: #6B7280
  - Font: 400, 14px
  - Text-decoration: line-through
```

### 3. FilterDrawer Component

**Position:** Bottom sheet (mobile) / Sidebar (desktop)
**Trigger:** Filter button in header

**Structure:**
```
┌─────────────────────────┐
│ X  Filtros              │  ← Header
├─────────────────────────┤
│ ☐ Mercearia             │  ← Category filters
│ ☐ Talho                 │
│ ☐ Peixaria              │
│                         │
│ Price Range: €5 - €50   │  ← Range slider
│                         │
│ ☐ In Promo              │  ← Promo filter
│ ☐ Top Vendas            │
├─────────────────────────┤
│ [Apply] [Reset]         │  ← Actions
└─────────────────────────┘
```

### 4. CheckoutSheet Component

**Position:** Bottom sheet (mobile) / Side panel (desktop)

**Structure:**
```
┌──────────────────────────┐
│ Your Order               │
├──────────────────────────┤
│ Item 1            €8,50  │
│ Item 2            €12,00 │
├──────────────────────────┤
│ Subtotal:         €20,50 │
│ Delivery Fee:     €3,50  │
│ Total:            €24,00 │
├──────────────────────────┤
│ [Proceed to Checkout]    │
└──────────────────────────┘
```

### 5. AdminTable Component

**Structure:** Sortable columns, bulk actions, inline edit

```
┌────────────────────────────────────────┐
│ ☐ Name    │ Category │ Price │ Stock   │
├────────────────────────────────────────┤
│ ☐ Feijão  │ Mercearia│ €2,50 │ 45      │
│ ☐ Arroz   │ Mercearia│ €1,20 │ 120     │
│ ☐ Peixe   │ Peixaria │ €8,50 │ 10      │
└────────────────────────────────────────┘
```

---

## 📱 Screen Specifications

### Screen 1: Home Page (Mobile - 360px width)

**Layout:**
```
┌───────────────────┐
│    Navigation     │  ← Header with logo + search + cart icon
├───────────────────┤
│  Hero Banner      │  ← Promotional image or featured product
│  (Full width)     │
├───────────────────┤
│ TOP VENDAS        │  ← Section title
│ [Product Cards]   │  ← Horizontal scroll or grid
│ [4 cards]         │
├───────────────────┤
│ CATEGORIAS        │  ← Section title
│ [Category Grid]   │  ← 3 columns
│  Mercearia        │
│  Talho            │
│  Peixaria         │
│  Cosméticos       │
│  Outros           │
├───────────────────┤
│ PROMOÇÕES         │  ← Promotional products grid
│ [Product Cards]   │
│ [4 cards]         │
├───────────────────┤
│   Footer          │  ← Contact, links, social
└───────────────────┘
```

**Typography:**
- Page Title: "Bem-vindo à Loja Africana Rosa" (h1, 36px)
- Section Titles: "Top Vendas", "Categorias" (h2, 24px)
- Product Names: 14px, medium
- Prices: 16px, bold, primary color

### Screen 2: Product Catalog (Mobile - 360px width)

**Layout:**
```
┌───────────────────┐
│ Search + Filter   │  ← Search bar + filter button
├───────────────────┤
│ Results (24)      │  ← Meta info with result count
├───────────────────┤
│ [Product Card]    │  ← 2-column grid
│ [Product Card]    │
│ [Product Card]    │
│ [Product Card]    │
├───────────────────┤
│ Load More / Pag.  │  ← Pagination or infinite scroll
└───────────────────┘
```

**Interactive Elements:**
- Search input: placeholder "Procurar produtos..."
- Filter button: Opens FilterDrawer
- Product cards: Tap to open detail page

### Screen 3: Product Detail (Mobile - 360px width)

**Layout:**
```
┌───────────────────┐
│ Back | Share      │  ← Header actions
├───────────────────┤
│  Product Image    │  ← Large image (1:1 or 4:3)
│  (Carousel)       │
├───────────────────┤
│ Category Badge    │  ← "Mercearia", "Talho", etc.
│ Product Name      │  ← h2
│ Rating (optional) │  ← Stars + count
├───────────────────┤
│ Price Section:    │
│ €8,50 (PROMO)     │  ← Large, primary color
│ ~~€12,00~~        │  ← Strikethrough
│ -30% OFF          │  ← Badge
├───────────────────┤
│ Description       │  ← Body text, 14px
│ Ingredients:      │
│ • Ingrediente 1   │
│ • Ingrediente 2   │
├───────────────────┤
│ Quantity:         │  ← Stepper (-, 1, +)
│ [Add to Cart]     │  ← CTA button, sticky bottom
└───────────────────┘
```

### Screen 4: Shopping Cart (Mobile - 360px width)

**Layout:**
```
┌───────────────────┐
│ Cart (2 items)    │  ← Header
├───────────────────┤
│ [Product 1]       │  ← Cart item
│ Feijão x2    €5.00│  ← [x] delete
│ Subtotal: €5.00   │
├───────────────────┤
│ [Product 2]       │
│ Arroz x1    €1.20 │
│ Subtotal: €1.20   │
├───────────────────┤
│ [Continue Sh.]    │  ← CTA to catalog
├───────────────────┤
│ Subtotal:  €6.20  │  ← Summary
│ Entrega:   €3.50  │
│ TOTAL:     €9.70  │
├───────────────────┤
│ [Go to Checkout]  │  ← CTA button
└───────────────────┘
```

### Screen 5: Checkout (Mobile - 360px width)

**Layout:**
```
┌───────────────────┐
│ Checkout          │  ← Header
├───────────────────┤
│ ENDEREÇO          │  ← Form section
│ [Street input]    │
│ [City input]      │
│ [ZIP input]       │
├───────────────────┤
│ MÉTODO ENTREGA    │  ← Options
│ ○ Standard (€3,50)│
│ ○ Express (€5,50) │
├───────────────────┤
│ PAGAMENTO         │  ← Payment section
│ ○ Card            │
│ ○ PayPal          │
│ ○ Bank Transfer   │
├───────────────────┤
│ Subtotal: €6.20   │  ← Summary (sticky bottom)
│ Entrega: €3.50    │
│ TOTAL:    €9.70   │
│ [Place Order]     │  ← CTA
└───────────────────┘
```

### Screen 6: Admin Dashboard (Desktop - 1024px width)

**Layout:**
```
┌────────────────────────────────────────────┐
│ Logo | Dashboard | Products | Orders | ... │  ← Sidebar nav
├────────────────────────────────────────────┤
│                                            │
│ Dashboard                                  │  ← Page title
│                                            │
│ [Stat Card] [Stat Card] [Stat Card]       │  ← KPI cards
│ Orders: 24 | Revenue: €512 | Visitors: 1K │
│                                            │
│ Recent Orders Table                        │
│ ┌──────────────────────────────────────┐  │
│ │ Order │ Customer │ Total │ Status     │  │
│ │ #001  │ João     │ €24   │ Delivered  │  │
│ │ #002  │ Maria    │ €45   │ Processing │  │
│ └──────────────────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

---

## 🎯 Design Tokens (for CSS Generation)

```json
{
  "colors": {
    "primary": "#B93B8F",
    "primary-dark": "#8B2D6B",
    "secondary": "#D4AF37",
    "accent": "#FF6B35",
    "success": "#10B981",
    "error": "#EF4444",
    "neutral-50": "#F9FAFB",
    "neutral-100": "#F3F4F6",
    "neutral-200": "#E5E7EB",
    "neutral-500": "#6B7280",
    "neutral-900": "#111827"
  },
  "typography": {
    "h1": { "size": "36px", "weight": "700", "lineHeight": "44px" },
    "h2": { "size": "30px", "weight": "700", "lineHeight": "36px" },
    "h3": { "size": "24px", "weight": "600", "lineHeight": "32px" },
    "body-large": { "size": "16px", "weight": "400", "lineHeight": "24px" },
    "body": { "size": "14px", "weight": "400", "lineHeight": "20px" },
    "caption": { "size": "12px", "weight": "500", "lineHeight": "16px" }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px"
  },
  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.07)",
    "lg": "0 20px 25px rgba(0,0,0,0.1)"
  },
  "borderRadius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "999px"
  }
}
```

---

## ✅ Implementation Checklist

### Design System Setup in Figma
- [ ] Create page: "Design System"
- [ ] Color styles (11 colors)
- [ ] Typography styles (6 text styles)
- [ ] Shadow styles (3 levels)
- [ ] Border radius styles (5 types)

### Component Library Setup
- [ ] Create page: "Components"
- [ ] Button (4 variants × 3 sizes = 12 components)
- [ ] ProductCard (3 variants)
- [ ] FilterDrawer
- [ ] CheckoutSheet
- [ ] AdminTable
- [ ] Input fields
- [ ] Navigation header

### Screens Setup
- [ ] Create page: "Mobile Screens"
  - [ ] Home Page
  - [ ] Catalog Page
  - [ ] Product Detail
  - [ ] Shopping Cart
  - [ ] Checkout
- [ ] Create page: "Desktop Screens"
  - [ ] Admin Dashboard

### Design Tokens Export
- [ ] Create JSON file with all design tokens
- [ ] Verify color codes match spec
- [ ] Validate typography scales
- [ ] Confirm spacing values

---

## 🚀 Next Steps

1. **Build in Figma** using this specification
2. **Apply design tokens** to components
3. **Create component variants** for all states
4. **Share File ID** with Claude Code
5. **Use MCP Figma** to extract designs and tokens
6. **Claude Code generates** Angular components + Tailwind CSS

---

**Design Specification Version:** 1.0
**Last Updated:** 2025-10-27
**Created for:** Loja Africana Rosa E-Commerce Platform
**Maintained by:** Ginquel Moreira - Limitless GMTech Solutions, Lda
