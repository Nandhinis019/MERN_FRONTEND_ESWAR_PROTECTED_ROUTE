import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, RotateCcw, Percent } from 'lucide-react';

export default function Homepage() {
  const featuredCategories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      link: '/category/electronics',
      discount: '50% OFF'
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      link: '/category/fashion',
      discount: '40% OFF'
    },
    {
      name: 'Home & Kitchen',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      link: '/category/home',
      discount: '30% OFF'
    },
    {
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      link: '/category/books',
      discount: '25% OFF'
    }
  ];

  const features = [
    {
      icon: <Truck size={24} />,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹499'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Payment',
      description: '100% secure payment protection'
    },
    {
      icon: <RotateCcw size={24} />,
      title: 'Easy Returns',
      description: '7-day hassle-free returns'
    },
    {
      icon: <Star size={24} />,
      title: 'Quality Products',
      description: 'Verified quality products only'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🎉 Great Indian Festival Sale!
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Up to 80% off on Electronics, Fashion & More!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products?discounts=true"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Percent size={20} className="mr-2" />
                Shop Deals Now
              </Link>
              <Link
                to="/category/electronics"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Explore Electronics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {category.discount}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">Explore now →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ZOVAi.in?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of happy customers and discover amazing deals every day!
          </p>
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}