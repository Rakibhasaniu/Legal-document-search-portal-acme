import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, setQuery, clearResults } from '../store/searchSlice';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query, loading } = useSelector((state) => state.search);
  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 800);

  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery.trim().length >= 3) {
      dispatch(setQuery(debouncedQuery));
      dispatch(fetchSearchResults({ query: debouncedQuery, maxResults: 10 }));
    } else if (!debouncedQuery.trim()) {
      dispatch(clearResults());
    }
  }, [debouncedQuery, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(setQuery(localQuery));
      dispatch(fetchSearchResults({ query: localQuery, maxResults: 10 }));
    }
  };

  const handleChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(clearResults());
  };

  const isTyping = localQuery !== debouncedQuery && localQuery.trim().length >= 3;

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <div className="input-with-clear">
            <input
              type="text"
              value={localQuery}
              onChange={handleChange}
              placeholder="Search legal documents (e.g., employment termination, confidential information)"
              className="search-input"
              disabled={loading}
            />
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="clear-button"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={loading || !localQuery.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {isTyping && (
          <div className="search-hint">
            <span className="typing-indicator">⌨️</span>
            Searching as you type...
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
