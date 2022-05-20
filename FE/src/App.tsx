import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLayout } from 'components/layouts/changgun';
import Loading from './components/Loading';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const MyPage = React.lazy(() => import('./pages/MyPage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const Error404 = React.lazy(() => import('./components/Error404'));
const MyPurchasePage = React.lazy(() => import('./pages/MyPurchasePage'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfilePage'));
const MyAddressPage = React.lazy(() => import('./pages/MyAddressPage'));
const MyWishPage = React.lazy(() => import('./pages/MyWishPage'));
const AuctionPage = React.lazy(() => import('./pages/AuctionPage'));
const TestPage = React.lazy(() => import('./pages/TestPage'));
const MyAccountPage = React.lazy(() => import('./pages/MyAccountPage'));
const PayApprovePage = React.lazy(() => import('./pages/PayApprovePage'));
const PayFailPage = React.lazy(() => import('./pages/PayFailPage'));
const MySalesPage = React.lazy(() => import('./pages/MySalesPage'));

function App() {
  return (
    <Router>
      <PageLayout>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/my/buying" element={<MyPurchasePage />} />
            <Route path="/my/profile" element={<MyProfilePage />} />
            <Route path="/my/address" element={<MyAddressPage />} />
            <Route path="/my/wish" element={<MyWishPage />} />
            <Route path="/my/sales" element={<MySalesPage />} />
            <Route path="/my/account" element={<MyAccountPage />} />
            <Route path="/shop/:product" element={<ShopPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/auction/:auctionId" element={<AuctionPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/payment/:auctionId" element={<PaymentPage />} />
            <Route
              path="/payment/result/approve"
              element={<PayApprovePage />}
            />
            <Route path="/payment/result/fail" element={<PayFailPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </React.Suspense>
      </PageLayout>
    </Router>
  );
}
export default App;
