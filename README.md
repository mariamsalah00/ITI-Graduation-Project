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


# ITI-Graduation-Project
