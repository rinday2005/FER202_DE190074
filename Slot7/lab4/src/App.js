import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import QuantityAdjustment from './components/QuantityAdjustment';
import QuantityAdjustment2 from './components/QuantityAdjustment2';
import OrderModal from './components/OrderModal';
import OrderModal2 from './components/OrderModal2';
import ProductForm from './components/ProductForm';
import ProductForm2 from './components/ProductForm2';
import TodoList from './components/TodoList';
import TodoList2 from './components/TodoList2';
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
            <Route path="/ex1-2" element={<QuantityAdjustment2 />} />
            <Route path="/ex2" element={<OrderModal />} />
            <Route path="/ex2-2" element={<OrderModal2 />} />
            <Route path="/ex3" element={<ProductForm />} />
            <Route path="/ex3-2" element={<ProductForm2 />} />
            <Route path="/ex4" element={<TodoList />} />
            <Route path="/ex4-2" element={<TodoList2 />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
