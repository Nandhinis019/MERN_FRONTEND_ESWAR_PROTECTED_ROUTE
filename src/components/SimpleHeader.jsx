import React from 'react';
import { Link } from 'react-router-dom';

export default function SimpleHeader({ cart }) {
  return (
    <header className="w-full bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-orange-400">
            ZOVAi.in
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-300">Home</Link>
            <Link to="/products" className="hover:text-orange-300">Products</Link>
            <Link to="/category/electronics" className="hover:text-orange-300">Electronics</Link>
            <Link to="/category/fashion" className="hover:text-orange-300">Fashion</Link>
            <Link to="/cart" className="hover:text-orange-300">
              Cart ({cart?.length || 0})
            </Link>
            <Link to="/login" className="hover:text-orange-300">Login</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}