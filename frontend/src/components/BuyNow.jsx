import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { categoryProducts } from '../data/categoryProducts';
import { API } from '../utils/api';

export default function BuyNow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProductAndCreateOrder = async () => {
      setLoading(true);
      try {
        // Fetch product from API
        const productResponse = await fetch(`${API}/api/products/${id}`);
        if (productResponse.ok) {
          const productData = await productResponse.json();
          setProduct(productData);

          // Create order
          const orderData = {
            productId: productData._id,
            quantity: 1,
            totalAmount: productData.price,
            status: 'confirmed'
          };

          const orderResponse = await fetch(`${API}/api/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });

          if (!orderResponse.ok) {
            console.error('Failed to create order');
          }
        } else {
          // Fallback to static data
          const allProducts = [...categoryProducts.electronics, ...categoryProducts.fashion];
          const foundProduct = allProducts.find((product) => product._id === id);
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error:', error);
        // Fallback to static data
        const allProducts = [...categoryProducts.electronics, ...categoryProducts.fashion];
        const foundProduct = allProducts.find((product) => product._id === id);
        setProduct(foundProduct);
      }
      setLoading(false);
    };

    fetchProductAndCreateOrder();
  }, [id]);
  
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Confirmation</h2>
        
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-24 h-24 object-cover rounded-md border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-xl font-bold text-orange-600">₹{product.price}</p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-green-600 mr-3">✅</div>
            <div>
              <h4 className="font-semibold text-green-800">Order Placed Successfully!</h4>
              <p className="text-green-700">Your order will be delivered within 2-3 business days.</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            to="/orders"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold text-center transition-colors"
          >
            View Orders
          </Link>
          <Link 
            to="/"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold text-center transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}