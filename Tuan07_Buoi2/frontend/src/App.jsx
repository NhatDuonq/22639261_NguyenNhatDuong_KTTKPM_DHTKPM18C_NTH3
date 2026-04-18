import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductListPage from './pages/ProductList';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import OrdersPage from './pages/Orders';
import AdminProductsPage from './pages/Admin/AdminProductsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-4 pb-12">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          <p>&copy; 2026 Flash Sale System. Đồ án môn học KTTKPM.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
