import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loading from "./components/Loading";

const HomePage = React.lazy(() => import("./pages/HomePage"));

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
