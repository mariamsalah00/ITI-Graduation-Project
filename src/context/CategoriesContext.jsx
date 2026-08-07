import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getCategories as fetchCategoriesJson } from "../services/categoryService";

const CategoriesContext = createContext(null);
const STORAGE_KEY = "glowcare_categories";

// Same fix as ProductsContext: Array.isArray, not a truthy check, is what
// actually guarantees .map()/.filter() are safe to call downstream.
const asArray = (value) => (Array.isArray(value) ? value : []);

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useLocalStorage(STORAGE_KEY, null);
  const [loading, setLoading] = useState(categories === null);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchCategoriesJson()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error(
            `Expected an array of categories, got ${typeof data}.`,
          );
        }
        setCategories(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (Array.isArray(categories)) {
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeCategories = asArray(categories);

  const addCategory = (category) => {
    const newCategory = { ...category, id: `c${Date.now()}` };
    setCategories((prev) => [...asArray(prev), newCategory]);
    return newCategory;
  };

  const updateCategory = (id, updates) => {
    setCategories((prev) =>
      asArray(prev).map((c) =>
        String(c.id) === String(id) ? { ...c, ...updates } : c,
      ),
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) =>
      asArray(prev).filter((c) => String(c.id) !== String(id)),
    );
  };

  const retry = () => load();

  const value = {
    categories: safeCategories,
    loading,
    error,
    retry,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx)
    throw new Error("useCategories must be used within CategoriesProvider");
  return ctx;
}
