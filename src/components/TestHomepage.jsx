import React from 'react';
import { Link } from 'react-router-dom';

export default function TestHomepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to ZOVAi.in
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop shop for everything!
          </p>
          <div className="space-x-4">
            <Link 
              to="/products" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Shop Now
            </Link>
            <Link 
              to="/category/electronics" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Electronics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}