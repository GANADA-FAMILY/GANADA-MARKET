import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const MyPage = React.lazy(() => import('./pages/MyPage'));
const MyPurchasePage = React.lazy(() => import('./pages/MyPurchasePage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const Error404 = React.lazy(() => import('./components/Error404'));
const TestPage = React.lazy(() => import('./pages/TestPage'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/my/buying" element={<MyPurchasePage />} />
          <Route path="/shop/:product" element={<ShopPage />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
