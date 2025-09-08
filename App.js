import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMovieSearch } from './hooks/useMovieSearch';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchlist, setWatchlist] = useLocalStorage('movieWatchlist', []);
  
  const { movies, loading, error } = useMovieSearch(query);

  const handleAddToWatchlist = (movie) => {
    const newMovie = { ...movie, watched: false };
    setWatchlist([...watchlist, newMovie]);
  };

  const handleRemoveFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  const handleToggleWatched = (movieId) => {
    setWatchlist(
      watchlist.map(movie => 
        movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="tabs">
        <div className="container">
          <button 
            className={activeTab === 'discover' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </button>
          <button 
            className={activeTab === 'watchlist' ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab('watchlist')}
          >
            My Watchlist
          </button>
        </div>
      </div>

      {activeTab === 'discover' && (
        <>
          <SearchBar query={query} setQuery={setQuery} />
          {loading && (
            <div className="container">
              <div className="loading">Loading movies...</div>
            </div>
          )}
          {error && (
            <div className="container">
              <div className="error">Error: {error}</div>
            </div>
          )}
          {!loading && !error && (
            <MovieList 
              movies={movies} 
              watchlist={watchlist}
              onAddToWatchlist={handleAddToWatchlist}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onToggleWatched={handleToggleWatched}
              onMovieSelect={handleMovieSelect}
            />
          )}
        </>
      )}

      {activeTab === 'watchlist' && (
        <Watchlist 
          watchlist={watchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          onToggleWatched={handleToggleWatched}
          onMovieSelect={handleMovieSelect}
        />
      )}

      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={handleCloseMovieDetails} 
        />
      )}
    </div>
  );
}

export default App;