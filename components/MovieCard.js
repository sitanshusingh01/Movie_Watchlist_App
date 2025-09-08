import React from 'react';
import { getImageUrl } from '../services/tmdb';

const MovieCard = ({ movie, onAddToWatchlist, onRemoveFromWatchlist, onToggleWatched, isInWatchlist, isWatched }) => {
  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      onRemoveFromWatchlist(movie.id);
    } else {
      onAddToWatchlist(movie);
    }
  };

  const handleWatchedClick = () => {
    onToggleWatched(movie.id);
  };

  return (
    <div className="movie-card">
      <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
        <div className="movie-actions">
          <button 
            className={`btn ${isInWatchlist ? 'btn-remove' : 'btn-add'}`}
            onClick={handleWatchlistClick}
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
          {isInWatchlist && (
            <button 
              className={`btn ${isWatched ? 'btn-watched' : 'btn-unwatched'}`}
              onClick={handleWatchedClick}
            >
              {isWatched ? 'Watched' : 'Mark as Watched'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;