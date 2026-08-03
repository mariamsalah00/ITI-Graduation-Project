import { useEffect, useState } from 'react';

/**
 * useState that mirrors its value to localStorage under `key`.
 * Centralizing this in one hook means every context (cart, wishlist, auth,
 * theme mode) persists the same way — one bug fix here fixes all of them.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: failed to read "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`useLocalStorage: failed to write "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
