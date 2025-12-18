import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Star, ShoppingCart, Trash2, Eye } from "lucide-react";
import { categoryProducts } from '../data/categoryProducts';

import { API } from '../utils/api';

export default function Products({ setCart, cart, showDiscounts }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  const searchQuery = searchParams.get('search');
  const discountsParam = searchParams.get('discounts');

  // Sample discount data (in real app, this would come from backend)
  const discountProducts = {
    // Add product IDs that have discounts
  };

  // Load products from API with fallback to static data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error('API not available');
        }
      } catch (error) {
        console.log('Using static data - Backend not available');
        // Use static data as fallback
        const allProducts = [...categoryProducts.electronics, ...categoryProducts.fashion];
        setProducts(allProducts);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filter products based on search, category, and discounts
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by discounts
    if (showDiscounts || discountsParam === 'true') {
      filtered = filtered.filter(product => product.discount > 0);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, showDiscounts, category]);

  // ✅ Add to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/deleteProduct/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.status === 204 || res.ok) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">🎉 Great Indian Festival Sale!</h2>
        <p className="text-lg">Up to 80% off on Electronics, Fashion & More!</p>
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : 
           showDiscounts ? 'Discounted Products' : 
           category === 'electronics' ? 'Electronics' :
           category === 'fashion' ? 'Fashion' : 'All Products'}
        </h2>
        <p className="text-gray-600">{filteredProducts.length} results</p>
        
        {/* Discount Toggle */}
        <div className="mt-4">
          <button
            onClick={() => window.location.href = '/products?discounts=true'}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showDiscounts 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-red-100'
            }`}
          >
            🏷️ Show Discounted Items Only
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative mb-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-md"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-orange-600 transition-colors">
                  <Link to={`/product/${product._id}`}>
                    {product.name}
                  </Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex space-x-2 mt-3">
                  <Link 
                    to={`/product/${product._id}`}
                    className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    Add to Cart
                  </button>
                </div>

                {/* Admin Delete Button */}
                <button 
                  onClick={() => deleteProduct(product._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center mt-2"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
