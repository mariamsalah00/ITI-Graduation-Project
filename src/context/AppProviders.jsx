import { ThemeModeProvider } from "./ThemeModeContext";
import { NotificationProvider } from "./NotificationContext";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { ProductsProvider } from "./ProductsContext";
import { CategoriesProvider } from "./CategoriesContext";

/**
 * Single composition point for every context provider. Order matters only
 * where one context's hook is used inside another (none currently are) —
 * this order is chosen so "app chrome" concerns (theme, notifications)
 * wrap "app data" concerns (auth, cart, wishlist, products, categories).
 */
export function AppProviders({ children }) {
  return (
    <ThemeModeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ProductsProvider>
            <CategoriesProvider>
              <CartProvider>
                <WishlistProvider>{children}</WishlistProvider>
              </CartProvider>
            </CategoriesProvider>
          </ProductsProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeModeProvider>
  );
}
