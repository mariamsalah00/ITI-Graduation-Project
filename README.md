# GLOWCARE — Skincare E-commerce (React + MUI)

A full customer storefront + admin dashboard built with React, Material UI,
Bootstrap grid utilities, React Router, Axios, Context API, Formik, Yup,
react-icons, and i18next (English/Arabic with RTL). No backend, no Redux,
no TypeScript — all data lives in local JSON + localStorage, per the brief.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL (default `http://localhost:5173`).

## Demo accounts

- **Admin:** `admin@glowcare.com` / `Admin123` → redirects to `/admin`
- **Customer:** register any new account via `/register`

## Changelog (latest round)

- **Fixed the `products.map is not a function` crash**: `ProductsContext`/
  `CategoriesContext` now validate the fetched data with `Array.isArray()`
  instead of a truthy-only `|| []` check, and a failed/malformed fetch
  surfaces as a real, retriable `ErrorState` everywhere (`Home`, `Shop`,
  `ProductDetails`, `SkinQuiz`, both admin list pages) instead of crashing.
- **Fixed a real dark-mode bug**: `--color-text-inverse` was being redefined
  per-theme and ended up dark-on-dark on the footer/admin sidebar in dark
  mode, making that text unreadable. It's now a constant light value used
  specifically for ink surfaces, which stay dark in both themes.
- **Added a router-level error boundary** (`RouteError.jsx`) so an
  unexpected render crash shows a real screen instead of the raw
  React Router stack trace.
- **Header rebuilt**: working search (expands to a full-width field,
  navigates to `/shop?search=...`), an auth-aware account menu with a
  real "Log out" action (there previously wasn't one for customers —
  only admins could log out), and icons reorganized so the toolbar
  doesn't overflow on narrow screens (language/theme/wishlist move into
  the mobile drawer at `xs`).
- **Shop page search is now URL-synced** via `useSearchParams`, so the
  header search, the page's own search field, and the back/forward
  buttons all agree.
- **Admin sidebar was unreachable on mobile** — it was `display: none`
  below `md` with no alternate entry point at all. Added a temporary/
  overlay Drawer variant plus a hamburger button in the admin Topbar.
- **Skin Quiz**: selecting a concern no longer auto-reveals results —
  there's now an explicit "See My Recommendations" button, so nothing
  is shown until the person actually submits.
- Login/Register redirect-back logic now survives hopping between the
  two pages (a guest bounced to `/login` who clicks through to
  `/register` lands back at their original destination, not always Home).

## What's implemented

**Customer:** Home, Shop (search + category/skin-type filters + sort +
pagination), Product Details (related products, wishlist, add to cart),
About, Contact (Formik+Yup), Login/Register (Formik+Yup, fake auth),
Wishlist, Cart (qty controls, totals), Checkout (Formik+Yup shipping +
payment, writes an order to localStorage, clears cart), Profile (order
history), Skin Quiz (2-question, no AI — filters `products.json` by
skin type + concern), 404.

**Admin (protected, admin-only):** Dashboard (product/category counts),
Products (list, delete-with-confirm, add/edit via Formik+Yup), Categories
(same CRUD pattern). All writes go to a localStorage copy — the original
`/public/data/products.json` and `categories.json` are never mutated
(see `ProductsContext` / `CategoriesContext`).

**Cross-cutting:** dark/light mode toggle (persisted, drives the MUI
theme + CSS variables), English/Arabic language switcher (persisted,
flips `<html dir>` for real RTL layout, not just mirrored text), toast
notifications via a single `NotificationContext`, responsive grid
layouts throughout, guest guards on Cart/Wishlist/Checkout/Profile,
admin guard on `/admin/*`.

## Design tokens are still provisional

`src/styles/variables.css` holds every color/font/spacing value and is
clearly marked as a visual approximation of the screenshots you shared —
not exact Figma Inspect values. Nothing else in the app hardcodes a
color or font; everything reads from that one file (directly in CSS,
and via `src/theme/getTheme.js` for MUI), so sending real hex/px/font
values only requires editing that single file.

## Project structure

```
src/
  admin/
    pages/          Dashboard, Products, ProductForm, Categories, CategoryForm
  components/
    common/          ProductCard, StarRating, PriceTag, EmptyState, ErrorState,
                      Loader, ConfirmDialog, QuantityInput
    layout/
      CustomerLayout/  Header, Footer, CustomerLayout
      AdminLayout/     Sidebar, Topbar, AdminLayout
    ProtectedRoute/    ProtectedRoute (guest guard), AdminRoute (admin guard)
  context/           AppProviders + Auth/Cart/Wishlist/Products/Categories/
                      ThemeMode/Notification contexts
  hooks/             useLocalStorage, useDebounce
  i18n/              i18next config + en.json / ar.json
  pages/             Home, Shop, ProductDetails, About, Contact, Login,
                      Register, Wishlist, Cart, Checkout, Profile, SkinQuiz,
                      NotFound
  routes/            Central route tree (index.jsx)
  services/          axiosClient, productService, categoryService
  theme/             getTheme.js (MUI theme reading CSS variables)
  styles/            variables.css (design tokens), global.css
  validation/        authSchemas, productSchema, categorySchema,
                      checkoutSchema, contactSchema
public/data/         products.json, categories.json (read-only source data)
```

## Known limitations (transparency, not hidden gaps)

- Product photography is placehold.co placeholder images (labelled with
  the product name) — swap the `image` field in
  `public/data/products.json` for real photography when you have it.
- Exact pixel/hex/font fidelity to the Figma file is not guaranteed —
  see "Design tokens are still provisional" above.
- Checkout payment fields are format-validated only (Yup regex) — there
  is no real payment processing, per the "no backend" requirement.
# ITI-Graduation-Project
