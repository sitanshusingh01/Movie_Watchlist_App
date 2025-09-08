import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, watchlist, onAddToWatchlist, onRemoveFromWatchlist, onToggleWatched }) => {
  if (movies.length === 0) {
    return (
      <div className="container">
        <div className="no-movies">
          <p>No movies found. Try a different search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movie-grid">
        {movies.map(movie => {
          const isInWatchlist = watchlist.some(item => item.id === movie.id);
          const watchlistItem = watchlist.find(item => item.id === movie.id);
          const isWatched = watchlistItem ? watchlistItem.watched : false;
          
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddToWatchlist={onAddToWatchlist}
              onRemoveFromWatchlist={onRemoveFromWatchlist}
              onToggleWatched={onToggleWatched}
              isInWatchlist={isInWatchlist}
              isWatched={isWatched}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;