import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import QuantityAdjustment from './components/QuantityAdjustment';
import OrderModal from './components/OrderModal';
import ProductForm from './components/ProductForm';
import TodoList from './components/TodoList';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<div className="text-center mt-5"><h1>Welcome to Slot 7 Exercises</h1><p>Select an exercise from the menu.</p></div>} />
            <Route path="/ex1" element={<QuantityAdjustment />} />
            <Route path="/ex2" element={<OrderModal />} />
            <Route path="/ex3" element={<ProductForm />} />
            <Route path="/ex4" element={<TodoList />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
