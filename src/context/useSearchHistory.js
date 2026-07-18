import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const MAX_HISTORY = 10;

function storageKey(email) {
  return `skyline_weather_history_${email}`;
}

export function useSearchHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }
    const stored = localStorage.getItem(storageKey(user.email));
    setHistory(stored ? JSON.parse(stored) : []);
  }, [user]);

  const addToHistory = useCallback(
    (city, summary) => {
      if (!user) return;
      setHistory((prev) => {
        const entry = { city, summary, searchedAt: new Date().toISOString() };
        const deduped = prev.filter((h) => h.city.toLowerCase() !== city.toLowerCase());
        const next = [entry, ...deduped].slice(0, MAX_HISTORY);
        localStorage.setItem(storageKey(user.email), JSON.stringify(next));
        return next;
      });
    },
    [user]
  );

  const clearHistory = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(storageKey(user.email));
    setHistory([]);
  }, [user]);

  return { history, addToHistory, clearHistory };
}
