import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPizza from './components/NavBarPizza';

// Helper to add artificial delay for demo purposes
const lazyWithDelay = (importPromise) => {
  return React.lazy(() =>
    Promise.all([
      importPromise(),
      new Promise((resolve) => setTimeout(resolve, 1000)), // 1 second delay
    ]).then(([moduleExports]) => moduleExports)
  );
};

// Lazy load all page components with delay
const DangKyForm = lazyWithDelay(() => import('./components/DangKy'));
const Home = lazyWithDelay(() => import('./components/Home'));
const Contact = lazyWithDelay(() => import('./components/Contact'));
const Quiz = lazyWithDelay(() => import('./components/Quiz'));
const CarouselPizza = lazyWithDelay(() => import('./components/CarouselPizza'));
const News = lazyWithDelay(() => import('./components/News'));
const LazyComp = lazyWithDelay(() => import('./components/LazyComp'));
const UserPage = lazyWithDelay(() => import('./components/UserPage'));
const PostPage = lazyWithDelay(() => import('./components/PostPage'));

function App() {
  return (
    <Router>
      {/* Thanh điều hướng cho ứng dụng đặt pizza */}
      <NavBarPizza />

      {/* Main Content Suspense Wrapper */}
      <Suspense fallback={<div className="text-center p-5"><h2>Loading page...</h2></div>}>
        <Routes>
          <Route path="/" element={
            <>
              <CarouselPizza />
              <Home />
            </>
          } />
          <Route path="/news" element={<News />} />
          <Route path="/register" element={<DangKyForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/lazy" element={<LazyComp />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/posts" element={<PostPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
