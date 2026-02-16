import React from 'react';
import '../styles/SearchBar.css';

function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search files..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {query && (
        <button 
          className="clear-btn"
          onClick={() => setQuery('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
