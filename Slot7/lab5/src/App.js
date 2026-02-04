import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarPizza from './components/NavBarPizza';
import DangKyForm from './components/DangKy';
import Home from './components/Home';
import Contact from './components/Contact';
import Quiz from './components/Quiz';
import CarouselPizza from './components/CarouselPizza';
import News from './components/News';

function App() {
  return (
    <Router>
      {/* Thanh điều hướng cho ứng dụng đặt pizza */}
      <NavBarPizza />

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
      </Routes>
    </Router>
  );
}

export default App;
