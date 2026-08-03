import { createBrowserRouter } from 'react-router-dom';
import { CustomerLayout } from '../components/layout/CustomerLayout/CustomerLayout';
import { AdminLayout } from '../components/layout/AdminLayout/AdminLayout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { AdminRoute } from '../components/ProtectedRoute/AdminRoute';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import SkinQuiz from '../pages/SkinQuiz';
import NotFound from '../pages/NotFound';

import Dashboard from '../admin/pages/Dashboard';
import Products from '../admin/pages/Products';
import ProductForm from '../admin/pages/ProductForm';
import Categories from '../admin/pages/Categories';
import CategoryForm from '../admin/pages/CategoryForm';
import { RouteError } from '../components/common/RouteError';

/**
 * Full route map. Guarded subtrees (ProtectedRoute, AdminRoute) redirect
 * unauthenticated/unauthorized visitors before any page component renders.
 * errorElement on both top-level routes catches render-time crashes and
 * shows a real UI instead of React Router's raw stack trace.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'shop/:productId', element: <ProductDetails /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'skin-quiz', element: <SkinQuiz /> },

      // Guest-blocked routes — everything under this node requires login
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'wishlist', element: <Wishlist /> },
          { path: 'cart', element: <Cart /> },
          { path: 'checkout', element: <Checkout /> },
          { path: 'profile', element: <Profile /> },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute />, // admin-only gate wraps the whole admin layout
    errorElement: <RouteError />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'products', element: <Products /> },
          { path: 'products/new', element: <ProductForm /> },
          { path: 'products/:productId/edit', element: <ProductForm /> },
          { path: 'categories', element: <Categories /> },
          { path: 'categories/new', element: <CategoryForm /> },
          { path: 'categories/:categoryId/edit', element: <CategoryForm /> },
        ],
      },
    ],
  },
]);
