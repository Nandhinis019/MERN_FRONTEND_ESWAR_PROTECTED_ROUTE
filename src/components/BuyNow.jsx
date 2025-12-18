import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { categoryProducts } from '../data/categoryProducts';
import { API } from '../utils/api';
import { User, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react';

export default function BuyNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Product Details, 2: Shipping Info, 3: Payment, 4: Confirmation
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    quantity: 1
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/api/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          throw new Error('API not available');
        }
      } catch (error) {
        console.log('Using static data - Backend not available');
        const allProducts = [...categoryProducts.electronics, ...categoryProducts.fashion];
        const foundProduct = allProducts.find((product) => product._id === id);
        setProduct(foundProduct);
      }
      setLoading(false);
    };

    // Pre-fill user data if logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setOrderData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
    }

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateShippingInfo = () => {
    const newErrors = {};

    if (!orderData.name) newErrors.name = 'Name is required';
    if (!orderData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(orderData.email)) newErrors.email = 'Email is invalid';
    if (!orderData.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(orderData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!orderData.address) newErrors.address = 'Address is required';
    if (!orderData.city) newErrors.city = 'City is required';
    if (!orderData.state) newErrors.state = 'State is required';
    if (!orderData.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(orderData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 2 && !validateShippingInfo()) {
      return;
    }
    setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const order = {
        productId: product._id,
        productName: product.name,
        productImage: product.image,
        quantity: orderData.quantity,
        price: product.price,
        totalAmount: product.price * orderData.quantity,
        customerInfo: {
          name: orderData.name,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          city: orderData.city,
          state: orderData.state,
          pincode: orderData.pincode
        },
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        orderId: 'ORD' + Date.now()
      };

      // Save order to localStorage (in real app, this would go to backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      setStep(4);
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Order placement failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getTotalPrice = () => {
    const subtotal = product.price * orderData.quantity;
    const tax = Math.round(subtotal * 0.18);
    return subtotal + tax;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link to="/" className="text-orange-600 hover:text-orange-700">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= stepNum ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNum ? 'bg-orange-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2 text-sm text-gray-600">
          <span className="mx-4">Product</span>
          <span className="mx-4">Shipping</span>
          <span className="mx-4">Payment</span>
          <span className="mx-4">Confirm</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Step 1: Product Details */}
        {step === 1 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
            <div className="flex items-center space-x-6 mb-6">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                  {product.discount > 0 && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <select 
                value={orderData.quantity} 
                onChange={(e) => setOrderData({...orderData, quantity: Number(e.target.value)})}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleNextStep}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Continue to Shipping
            </button>
          </div>
        )}

        {/* Step 2: Shipping Information */}
        {step === 2 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={orderData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={orderData.pincode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter pincode"
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your complete address"
                  />
                </div>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={orderData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={orderData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter state"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleNextStep}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Order Summary */}
        {step === 3 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary & Payment</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-gray-600">Quantity: {orderData.quantity}</p>
                      <p className="font-semibold">₹{product.price} each</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{product.price * orderData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (18%):</span>
                      <span>₹{Math.round(product.price * orderData.quantity * 0.18)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-orange-600">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck size={20} className="text-blue-600" />
                    <span className="font-semibold">Delivery Information</span>
                  </div>
                  <p className="text-sm text-gray-600">Expected delivery: 2-3 business days</p>
                  <p className="text-sm text-gray-600">Free delivery on orders above ₹499</p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <div className="border border-orange-300 bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="payment" defaultChecked className="text-orange-600" />
                      <CreditCard size={20} className="text-orange-600" />
                      <span className="font-semibold">Cash on Delivery</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Pay when your order is delivered</p>
                  </div>
                  
                  <div className="border border-gray-300 p-4 rounded-lg opacity-50">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="payment" disabled />
                      <Shield size={20} className="text-gray-400" />
                      <span>Online Payment (Coming Soon)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield size={20} className="text-green-600" />
                    <span className="font-semibold text-green-800">Secure Checkout</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">Your order and payment information is protected</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Back to Shipping
              </button>
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Order Confirmation */}
        {step === 4 && (
          <div className="p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600">Thank you for your order. We'll send you a confirmation email shortly.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-4">Order Details</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-600">Quantity: {orderData.quantity}</p>
                  <p className="font-bold text-orange-600">Total: ₹{getTotalPrice()}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Expected delivery: 2-3 business days</p>
            </div>

            <div className="flex space-x-4">
              <Link 
                to="/orders"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                View Orders
              </Link>
              <Link 
                to="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}