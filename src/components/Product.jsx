import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { categoryProducts } from '../data/categoryProducts';
import { API } from '../utils/api';


export default function Product({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const allProducts = [...categoryProducts.electronics, ...categoryProducts.fashion];
    const foundProduct = allProducts.find((item) => item._id === id);

    if (foundProduct) {
      const enhancedProduct = {
        ...foundProduct,
        images: [foundProduct.image, foundProduct.image, foundProduct.image],
        features: [
          "High Quality Material",
          "Fast Delivery Available", 
          "1 Year Warranty",
          "Easy Returns"
        ]
      };
      setProduct(enhancedProduct);

      const sampleReviews = [
        { id: 1, user: "Rajesh K.", rating: 5, comment: "Excellent product! Highly recommended.", date: "2024-01-15" },
        { id: 2, user: "Priya S.", rating: 4, comment: "Good quality, fast delivery.", date: "2024-01-10" },
        { id: 3, user: "Amit P.", rating: 5, comment: "Amazing value for money!", date: "2024-01-08" }
      ];
      setReviews(sampleReviews);
    }
    setLoading(false);
  }, [id]);

  const addToCart = () => {
    const updatedCart = [...cart];
    for (let i = 0; i < quantity; i++) {
      updatedCart.push(product);
    }
    setCart(updatedCart);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }
    // Navigate to buy now page
    window.location.href = `/buynow/${product._id}`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
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

  if (!product) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link to="/" className="text-orange-600 hover:text-orange-700">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <span className="mx-2">›</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg border"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                -{product.discount}%
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === index ? 'border-orange-400' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl font-bold text-red-600">₹{product.price}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="text-green-600 font-semibold">({product.discount}% off)</span>
                </>
              )}
            </div>

            <div className="mb-4">
              {product.inStock > 0 ? (
                <span className="text-green-600 font-semibold">In Stock ({product.inStock} available)</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">About this item</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <label className="font-semibold">Quantity:</label>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1"
              >
                {[...Array(Math.min(10, product.inStock || 1))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <button 
                onClick={addToCart}
                disabled={product.inStock === 0}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                Buy Now
              </button>
            </div>

            <div className="flex space-x-4 mt-4">
              <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                <Heart size={20} className="mr-1" />
                Add to Wishlist
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 size={20} className="mr-1" />
                Share
              </button>
            </div>

            <div className="border-t pt-6 mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Truck size={16} className="mr-2" />
                Free delivery by tomorrow
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield size={16} className="mr-2" />
                1 year warranty
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RotateCcw size={16} className="mr-2" />
                7 days return policy
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold">{product.rating || 4}.0</div>
            <div>
              <div className="flex">{renderStars(product.rating || 4)}</div>
              <div className="text-sm text-gray-600">{product.reviewCount || 0} global ratings</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="font-semibold">{review.user}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}