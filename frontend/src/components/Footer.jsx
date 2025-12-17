import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white mt-auto">
      {/* Back to Top */}
      <div 
        className="bg-gray-700 py-4 text-center cursor-pointer hover:bg-gray-600 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-sm">Back to top</span>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-800 px-4 py-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-orange-300 transition-colors">About ZOVAi</Link></li>
                <li><Link to="/careers" className="hover:text-orange-300 transition-colors">Careers</Link></li>
                <li><Link to="/press" className="hover:text-orange-300 transition-colors">Press Releases</Link></li>
                <li><Link to="/investor" className="hover:text-orange-300 transition-colors">Investor Relations</Link></li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/addproduct" className="hover:text-orange-300 transition-colors">Sell products on ZOVAi</Link></li>
                <li><Link to="/business" className="hover:text-orange-300 transition-colors">Sell on ZOVAi Business</Link></li>
                <li><Link to="/affiliate" className="hover:text-orange-300 transition-colors">Become an Affiliate</Link></li>
                <li><Link to="/advertise" className="hover:text-orange-300 transition-colors">Advertise Your Products</Link></li>
              </ul>
            </div>

            {/* ZOVAi Payment Products */}
            <div>
              <h3 className="font-bold text-lg mb-4">ZOVAi Payment Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/business-card" className="hover:text-orange-300 transition-colors">ZOVAi Business Card</Link></li>
                <li><Link to="/shop-points" className="hover:text-orange-300 transition-colors">Shop with Points</Link></li>
                <li><Link to="/reload" className="hover:text-orange-300 transition-colors">Reload Your Balance</Link></li>
                <li><Link to="/currency" className="hover:text-orange-300 transition-colors">ZOVAi Currency Converter</Link></li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/account" className="hover:text-orange-300 transition-colors">Your Account</Link></li>
                <li><Link to="/orders" className="hover:text-orange-300 transition-colors">Your Orders</Link></li>
                <li><Link to="/shipping" className="hover:text-orange-300 transition-colors">Shipping Rates & Policies</Link></li>
                <li><Link to="/returns" className="hover:text-orange-300 transition-colors">Returns & Replacements</Link></li>
                <li><Link to="/help" className="hover:text-orange-300 transition-colors">Help</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 px-4 py-8 border-t border-gray-700">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo */}
            <div className="mb-4 md:mb-0">
              <Link to="/" className="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-colors">
                ZOVAi.in
              </Link>
            </div>

            {/* Language and Country */}
            <div className="flex items-center space-x-6 text-sm">
              <button className="flex items-center border border-gray-600 px-3 py-1 rounded hover:border-gray-500 transition-colors">
                <span className="mr-2">🌐</span>
                English
              </button>
              <button className="flex items-center border border-gray-600 px-3 py-1 rounded hover:border-gray-500 transition-colors">
                <span className="mr-2">₹</span>
                INR - Indian Rupee
              </button>
              <button className="flex items-center border border-gray-600 px-3 py-1 rounded hover:border-gray-500 transition-colors">
                <span className="mr-2">🇮🇳</span>
                India
              </button>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
            <div className="flex flex-wrap justify-center space-x-6 mb-4">
              <Link to="/conditions" className="hover:text-orange-300 transition-colors">Conditions of Use</Link>
              <Link to="/privacy" className="hover:text-orange-300 transition-colors">Privacy Notice</Link>
              <Link to="/interest-ads" className="hover:text-orange-300 transition-colors">Interest-Based Ads</Link>
            </div>
            <p>© 2024, ZOVAi.in, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  );
}