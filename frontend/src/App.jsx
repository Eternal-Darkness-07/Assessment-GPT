import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestPage from './components/TestPage';
import ResultsPage from './components/ResultsPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultsPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
