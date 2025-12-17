import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { API } from '../utils/api';

export default function Cart({ cart, setCart }) {
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Group cart items by ID and count quantities
    const groupedItems = cart.reduce((acc, item) => {
      const existingItem = acc.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    setCartItems(groupedItems);
  }, [cart]);

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    const currentItem = cartItems.find(item => item._id === id);
    const currentQuantity = cart.filter(item => item._id === id).length;
    
    if (newQuantity > currentQuantity) {
      // Add items
      const itemsToAdd = Array(newQuantity - currentQuantity).fill(currentItem);
      setCart([...cart, ...itemsToAdd]);
    } else {
      // Remove items
      const updatedCart = [...cart];
      const itemsToRemove = currentQuantity - newQuantity;
      for (let i = 0; i < itemsToRemove; i++) {
        const index = updatedCart.findIndex(item => item._id === id);
        if (index > -1) {
          updatedCart.splice(index, 1);
        }
      }
      setCart(updatedCart);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Create orders for each cart item
      const orderPromises = cartItems.map(async (item) => {
        const orderData = {
          productId: item._id,
          quantity: item.quantity,
          totalAmount: item.price * item.quantity,
          status: 'confirmed'
        };

        const response = await fetch(`${API}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create order for ${item.name}`);
        }

        return response.json();
      });

      await Promise.all(orderPromises);

      // Clear the cart
      setCart([]);

      // Navigate to orders page
      navigate('/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <Link 
          to="/" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/" className="text-orange-600 hover:text-orange-700 mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                
                {/* Product Details */}
                <div className="flex-1">
                  <Link 
                    to={`/product/${item._id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">₹{item.price}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              {/* Item Total */}
              <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                <span className="text-lg font-semibold text-gray-900">
                  Subtotal: ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({getTotalItems()}):</span>
                <span className="font-semibold">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-semibold">₹{Math.round(getTotalPrice() * 0.18)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">₹{getTotalPrice() + Math.round(getTotalPrice() * 0.18)}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-3"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            
            <Link 
              to="/" 
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
            >
              Continue Shopping
            </Link>
            
            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <span>🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
