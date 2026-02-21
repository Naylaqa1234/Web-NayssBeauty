# 💄 Lumière Beauty — Next.js App

Website toko kecantikan premium dengan implementasi berbagai teknik rendering modern.

## 🌸 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Animations
- **State Management**: Zustand (global cart, wishlist, theme) + React useState (local)
- **Data Source**: [dummyjson.com](https://dummyjson.com) API
- **Icons**: Lucide React

---

## 🎨 Fitur Utama

### Pages
| Page | Route | Rendering |
|------|-------|-----------|
| Home | `/` | **SSG + ISR** (revalidate 1 jam) |
| About Us | `/about` | **SSG** (force-static) |
| Catalog | `/catalog` | **CSR** (Client-Side Rendering) |
| Beauty Tips | `/tips` | **SSG** (static content) |

### Teknik Rendering
1. **SSG (Static Site Generation)** — About & Tips pages di-generate saat build
2. **SSR + ISR (Incremental Static Regeneration)** — Home page fetch data dari API, cache 1 jam
3. **CSR (Client-Side Rendering)** — Catalog page: search, filter, pagination real-time

### State Management
- **Zustand** — Cart (tambah/hapus/update), Wishlist, Dark/Light Mode
- **useState** — Search query, filter panel, sort, pagination, card hover
- **Persistence** — Cart & wishlist tersimpan di localStorage

### UI/UX Features
- ✅ **Dark Mode / Light Mode** toggle (persistent)
- ✅ **Sticky Navbar** dengan blur backdrop saat scroll
- ✅ **Smooth Scroll** behavior
- ✅ **Cursor Glow** effect (desktop)
- ✅ **Animated shimmer light** pada header & button
- ✅ **Moving gradient orbs** (parallax dengan mouse)
- ✅ **Marquee banner** dengan pesan promosi
- ✅ **Card elevation** (hover shadow & lift)
- ✅ **Image hover zoom** pada product card
- ✅ **Scroll reveal animations** (fade in on scroll)
- ✅ **Morphing blob** backgrounds
- ✅ **Animated light rays**
- ✅ **Gradient text** (animated)
- ✅ **Loading skeleton** untuk produk
- ✅ **Wishlist** dengan toggle heart
- ✅ **Cart drawer** (slide-in dari kanan)
- ✅ **Toast feedback** saat tambah ke cart
- ✅ **Responsive** semua ukuran layar
- ✅ **Tooltip** pada navbar icons
- ✅ **Testimonial slider** auto-play
- ✅ **Timeline** perjalanan brand
- ✅ **Beauty tips accordion** interactive
- ✅ **Search & filter** catalog real-time
- ✅ **Pagination** catalog
- ✅ **Newsletter** subscribe form
- ✅ **Custom scrollbar** pink gradient

---

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+
- npm atau yarn

### Install & Run

```bash
# 1. Extract zip ke folder
# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser: http://localhost:3000
```

### Build Production

```bash
npm run build
npm start
```

---

## 📁 Struktur Project

```
lumiere-beauty/
├── app/
│   ├── page.tsx          # Home (SSG + ISR)
│   ├── about/            # About (SSG)
│   ├── catalog/          # Catalog (CSR)
│   ├── tips/             # Tips (SSG)
│   ├── api/              # API Routes (SSR)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles & animations
├── components/
│   ├── home/             # Home page components
│   ├── Navbar.tsx        # Sticky responsive navbar
│   ├── CartDrawer.tsx    # Slide-in cart
│   ├── ProductCard.tsx   # Interactive product card
│   ├── ProductSkeleton.tsx # Loading state
│   ├── Footer.tsx        # Footer with newsletter
│   ├── MarqueeBanner.tsx # Animated promo banner
│   ├── CursorGlow.tsx    # Cursor light effect
│   └── ThemeProvider.tsx # Dark/light mode
├── store/
│   └── index.ts          # Zustand stores
├── lib/
│   ├── api.ts            # API helper functions
│   └── tips-data.ts      # Static tips content
├── types/
│   └── index.ts          # TypeScript types
├── tailwind.config.ts    # Tailwind + custom animations
└── next.config.mjs       # Next.js config
```

---

## 🔧 API Integration

Data produk diambil dari **dummyjson.com**:
- `GET /products/category/beauty` — Daftar produk beauty
- `GET /products/search?q={query}` — Pencarian produk
- `GET /products/{id}` — Detail produk

---

## 🎭 Rendering Strategies Explained

### SSG (Static Site Generation)
```tsx
// app/about/page.tsx
export const dynamic = "force-static";
// Di-generate sekali saat npm run build
```

### ISR (Incremental Static Regeneration)
```tsx
// app/page.tsx
export const revalidate = 3600; // Refresh tiap 1 jam
```

### CSR (Client-Side Rendering)
```tsx
// app/catalog/page.tsx
"use client";
// Fetch dilakukan di browser, bukan server
useEffect(() => { fetchProducts(); }, [query, page]);
```

---

## 🌈 Color Palette

| Token | Light | Dark |
|-------|-------|------|
| Background | `#fff1f2` | `#0d0610` |
| Card | `#ffffff` | `#1e0d16` |
| Primary | `#f472b6` | `#f472b6` |
| Accent | `#fb7185` | `#f43f5e` |

---

Made with 💖 by Lumière Beauty Team
