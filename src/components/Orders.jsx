import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { API } from '../utils/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = () => {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        const sampleOrders = [
          {
            id: 'ORD001',
            date: '2024-01-15',
            status: 'delivered',
            total: 2499,
            items: [
              {
                id: 1,
                name: 'Wireless Bluetooth Headphones',
                price: 2499,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
              }
            ],
            deliveryAddress: '123 Main St, Mumbai, Maharashtra 400001'
          },
          {
            id: 'ORD002',
            date: '2024-01-20',
            status: 'shipped',
            total: 1299,
            items: [
              {
                id: 2,
                name: 'Smartphone Case',
                price: 1299,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300'
              }
            ],
            deliveryAddress: '123 Main St, Mumbai, Maharashtra 400001'
          }
        ];
        setOrders(sampleOrders);
        localStorage.setItem('orders', JSON.stringify(sampleOrders));
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
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

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${API}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (response.ok) {
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        );
        setOrders(updatedOrders);
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const canCancelOrder = (status) => {
    return status === 'processing' || status === 'shipped';
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
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">₹{order.total}</p>
                    <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                  <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </button>
                  
                  {order.status === 'delivered' && (
                    <>
                      <button className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                        Buy Again
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Write Review
                      </button>
                    </>
                  )}
                  
                  {canCancelOrder(order.status) && (
                    <button 
                      onClick={() => cancelOrder(order.id)}
                      className="flex items-center justify-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={16} className="mr-2" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}