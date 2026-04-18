import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 p-4 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider flex items-center gap-2">
          ⚡ FLASH SALE
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-200 transition-colors font-medium">Sản phẩm</Link>
          <Link to="/orders" className="hover:text-yellow-200 transition-colors font-medium relative flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Đơn hàng
          </Link>
          <Link to="/cart" className="hover:text-yellow-200 transition-colors font-medium relative flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Giỏ hàng
          </Link>
          <Link to="/admin/products" className="bg-white text-orange-600 hover:bg-orange-100 transition-colors font-bold px-3 py-1 rounded shadow text-sm">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
