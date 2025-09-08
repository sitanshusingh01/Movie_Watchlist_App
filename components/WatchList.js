import React, { useState } from 'react';
import MovieCard from './MovieCard';

const Watchlist = ({ watchlist, onRemoveFromWatchlist, onToggleWatched }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'watched', 'unwatched'

  const filteredWatchlist = watchlist.filter(movie => {
    if (filter === 'watched') return movie.watched;
    if (filter === 'unwatched') return !movie.watched;
    return true;
  });

  if (watchlist.length === 0) {
    return (
      <div className="container">
        <div className="watchlist-empty">
          <h2>Your Watchlist</h2>
          <p>Your watchlist is empty. Add some movies to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="watchlist-header">
        <h2>Your Watchlist ({watchlist.length})</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'btn active' : 'btn'} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'watched' ? 'btn active' : 'btn'} 
            onClick={() => setFilter('watched')}
          >
            Watched
          </button>
          <button 
            className={filter === 'unwatched' ? 'btn active' : 'btn'} 
            onClick={() => setFilter('unwatched')}
          >
            To Watch
          </button>
        </div>
      </div>
      
      <div className="movie-grid">
        {filteredWatchlist.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            onToggleWatched={onToggleWatched}
            isInWatchlist={true}
            isWatched={movie.watched}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;