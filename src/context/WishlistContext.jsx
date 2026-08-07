import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage("glowcare_wishlist", []); // [product, ...]

  const toggleItem = (product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      return exists
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product];
    });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const isInWishlist = (id) => items.some((i) => i.id === id);

  const value = useMemo(
    () => ({
      items,
      toggleItem,
      removeItem,
      isInWishlist,
      count: items.length,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
