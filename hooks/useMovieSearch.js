import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/tmdb';

export const useMovieSearch = (query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let results;
        if (query.trim() === '') {
          results = await getPopularMovies();
        } else {
          results = await searchMovies(query);
        }
        setMovies(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { movies, loading, error };
};