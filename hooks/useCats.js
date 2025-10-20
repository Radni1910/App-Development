// src/hooks/useCats.js
import { useEffect, useState } from "react";
import { fetchCats } from "../api/catApi";

export const useCats = (amount = 10) => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCats(amount);
      setCats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  return { cats, loading, error, reload: loadCats };
};
