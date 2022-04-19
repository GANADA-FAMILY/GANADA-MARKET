import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const MyPage = React.lazy(() => import("./pages/MyPage"));

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
