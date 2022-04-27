import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import ShopPage from './pages/ShopPage';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const MyPage = React.lazy(() => import('./pages/MyPage'));
const MyPurchasePage = React.lazy(() => import('./pages/MyPurchasePage'));
const ShopQueryPage = React.lazy(() => import('./pages/ShopQueryPage'));
function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/my/buying" element={<MyPurchasePage />} />
          <Route path="/shop/*" element={<ShopPage />}>
            <Route path=":query" element={<ShopQueryPage />} />
          </Route>
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
