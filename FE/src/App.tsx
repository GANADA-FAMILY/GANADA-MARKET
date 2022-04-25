import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const HomePage = React.lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
