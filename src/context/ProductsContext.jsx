import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getProducts as fetchProductsJson } from '../services/productService';

const ProductsContext = createContext(null);

const STORAGE_KEY = 'glowcare_products'; // separate from the read-only /data/products.json

/**
 * Bug fixed here: the old guard was `products || []`, which only catches
 * null/undefined/empty-string. A truthy-but-wrong-shaped value (an object,
 * a string — e.g. if the JSON fetch ever returns something that isn't
 * actually an array) sailed straight through and blew up `.map()` deeper
 * in the app. `asArray()` is the one place that decides "is this actually
 * a usable product list", so every consumer downstream can trust the type
 * without re-checking it.
 */
const asArray = (value) => (Array.isArray(value) ? value : []);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useLocalStorage(STORAGE_KEY, null); // null = "not seeded yet"
  const [loading, setLoading] = useState(products === null);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchProductsJson()
      .then((data) => {
        if (!Array.isArray(data)) {
          // Fail loudly and visibly (ErrorState + retry) instead of letting
          // a malformed response reach .map() somewhere else in the app.
          throw new Error(`Expected an array of products, got ${typeof data}.`);
        }
        setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeProducts = asArray(products);

  const getById = (id) => safeProducts.find((p) => String(p.id) === String(id));

  const addProduct = (product) => {
    const newProduct = { ...product, id: `p${Date.now()}` };
    setProducts((prev) => [...asArray(prev), newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => asArray(prev).map((p) => (String(p.id) === String(id) ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => asArray(prev).filter((p) => String(p.id) !== String(id)));
  };

  const retry = () => load();

  const value = {
    products: safeProducts,
    loading,
    error,
    retry,
    getById,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
