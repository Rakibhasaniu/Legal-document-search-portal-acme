import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, setQuery } from '../store/searchSlice';

const ResultsDisplay = () => {
  const dispatch = useDispatch();
  const { results, summary, documentsFound, processingTime, hasSearched } = useSelector(
    (state) => state.search
  );

  const searchSuggestions = [
    'employment',
    'confidential',
    'subscription',
    'termination'
  ];

  const handleSuggestionClick = (suggestion) => {
    dispatch(setQuery(suggestion));
  };

  if (!hasSearched) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📚</div>
        <h2>Legal Document Search Portal</h2>
        <p>Enter a search query to find relevant legal documents</p>
        <div className="suggestions">
          <p className="suggestions-title">Try searching for:</p>
          <ul>
            {searchSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (documentsFound === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No Results Found</h3>
        <p>Try different keywords or search terms</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Search Results</h2>
        <div className="results-meta">
          <span className="results-count">
            {documentsFound} document{documentsFound !== 1 ? 's' : ''} found
          </span>
          <span className="processing-time">
            ({processingTime}s)
          </span>
        </div>
      </div>

      {summary && (
        <div className="results-summary">
          <h3>Summary</h3>
          <p className="summary-text">{summary}</p>
        </div>
      )}

      <div className="results-list">
        {results.map((result) => (
          <div key={result.document_id} className="result-card">
            <div className="result-header">
              <h3 className="result-title">{result.title}</h3>
              <span className="result-category">{result.category}</span>
            </div>

            <div className="result-meta">
              <span className="meta-item">
                <strong>Jurisdiction:</strong> {result.jurisdiction}
              </span>
              <span className="meta-item">
                <strong>Effective Date:</strong> {result.effective_date}
              </span>
              <span className="meta-item">
                <strong>Relevance Score:</strong> {result.relevance_score}
              </span>
            </div>

            {result.matched_terms && result.matched_terms.length > 0 && (
              <div className="matched-terms">
                <strong>Matched Terms:</strong>
                <div className="terms-list">
                  {result.matched_terms.map((term, index) => (
                    <span key={index} className="term-badge">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.excerpts && result.excerpts.length > 0 && (
              <div className="excerpts">
                <strong>Relevant Excerpts:</strong>
                {result.excerpts.map((excerpt, index) => (
                  <div key={index} className="excerpt">
                    <p>{excerpt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
