import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye, RotateCcw } from 'lucide-react';
import { API } from '../utils/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      try {
        // Get orders from localStorage (in real app, this would be from API)
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'processing':
        return <Clock className="text-yellow-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const canCancelOrder = (status) => {
    return status === 'confirmed' || status === 'processing';
  };

  const cancelOrder = async (orderId) => {
    try {
      const updatedOrders = orders.map(order =>
        order.orderId === orderId ? { ...order, status: 'cancelled' } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-4">Start shopping to see your orders here!</p>
          <a href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.orderId}</h3>
                      <p className="text-sm text-gray-600">Placed on {formatDate(order.orderDate)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">₹{order.totalAmount}</p>
                    <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={order.productImage} 
                    alt={order.productName}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{order.productName}</h4>
                    <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                    <p className="text-sm font-semibold text-gray-900">₹{order.price} each</p>
                  </div>
                </div>

                {order.customerInfo && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{order.customerInfo.name}</p>
                      <p>{order.customerInfo.address}</p>
                      <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
                      <p>Phone: {order.customerInfo.phone}</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </button>
                  
                  {order.status === 'delivered' && (
                    <>
                      <button className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                        <RotateCcw size={16} className="mr-2" />
                        Buy Again
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Write Review
                      </button>
                    </>
                  )}
                  
                  {canCancelOrder(order.status) && (
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          cancelOrder(order.orderId);
                        }
                      }}
                      className="flex items-center justify-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={16} className="mr-2" />
                      Cancel Order
                    </button>
                  )}
                </div>

                {/* Order Status Timeline */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Order Status</h4>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${
                      ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-600' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">Order Confirmed</span>
                    </div>
                    
                    <div className={`w-8 h-0.5 ${
                      ['shipped', 'delivered'].includes(order.status) ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    
                    <div className={`flex items-center space-x-2 ${
                      ['shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        ['shipped', 'delivered'].includes(order.status) ? 'bg-green-600' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">Shipped</span>
                    </div>
                    
                    <div className={`w-8 h-0.5 ${
                      order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    
                    <div className={`flex items-center space-x-2 ${
                      order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-600' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}