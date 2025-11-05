import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css';

function App() {
  const { loading, error } = useSelector((state) => state.search);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Legal Document Search Portal</h1>
        
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <SearchBar />

          {error && <ErrorMessage message={error} />}

          {loading ? <LoadingSpinner /> : <ResultsDisplay />}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Legal Document Search Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
