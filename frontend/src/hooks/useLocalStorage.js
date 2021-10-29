import { useState } from "react";
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
      const item = localStorage.getItem(key);
      return localStorage.getItem(key) ? JSON.parse(item) : initialValue;
  });
  const setValue =value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [storedValue, setValue];
}