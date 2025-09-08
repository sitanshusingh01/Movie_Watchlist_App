import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar">
      <div className="container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;