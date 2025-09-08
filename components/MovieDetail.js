import React, { useState, useEffect } from 'react';
import { getMovieDetails, getImageUrl } from '../services/tmdb';

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const movieDetails = await getMovieDetails(movieId);
      setMovie(movieDetails);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details">
          <div className="error">Movie not found</div>
          <button className="btn btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-overlay">
      <div className="movie-details">
        <button className="btn btn-close" onClick={onClose}>×</button>
        <div className="movie-details-content">
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          <div className="movie-details-info">
            <h2>{movie.title}</h2>
            <p className="release-date">{movie.release_date}</p>
            <p className="overview">{movie.overview}</p>
            <div className="movie-stats">
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
              <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
              <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;