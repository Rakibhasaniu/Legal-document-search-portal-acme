import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, setQuery } from '../store/searchSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query, loading } = useSelector((state) => state.search);
  const [localQuery, setLocalQuery] = useState(query);

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

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={localQuery}
            onChange={handleChange}
            placeholder="Search legal documents (e.g., employment termination, confidential information)"
            className="search-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !localQuery.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
