import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import ProductList from './ProductList'; 
import CustomerForm from './CustomerForm'; 
import PlaceOrderForm from './PlaceOrderForm'; 
import NotFound from './NotFound'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to the E-commerce App</h1>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/customers" element={<CustomerForm />} />
        <Route path="/orders" element={<PlaceOrderForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
