import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShoppingCart, User, Globe, Percent, LogIn, LogOut } from 'lucide-react';

export default function Header({ cart, showDiscounts, setShowDiscounts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Select Location');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocation(`${data.city}, ${data.principalSubdivision}`);
          } catch (error) {
            setLocation('Location unavailable');
          }
        },
        () => setLocation('Location denied')
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="w-full bg-gray-900 text-white">
      {/* Main Header */}
      <div className="bg-gray-900 px-4 py-2">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-colors">
              ZOVAi.in
            </h1>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center text-sm cursor-pointer hover:text-orange-300 transition-colors">
            <MapPin size={16} className="mr-1" />
            <div>
              <div className="text-xs text-gray-300">Deliver to</div>
              <div className="font-semibold">{location}</div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ZOVAi.in"
                className="flex-1 px-4 py-2 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Discounts */}
            <button
              onClick={() => setShowDiscounts(!showDiscounts)}
              className={`flex items-center text-sm transition-colors ${
                showDiscounts ? 'text-orange-400' : 'hover:text-orange-300'
              }`}
            >
              <Percent size={16} className="mr-1" />
              <span>Offers</span>
            </button>

            {/* Login/Logout */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-sm hover:text-orange-300 transition-colors">
                  <User size={16} className="mr-1" />
                  <div className="text-left">
                    <div className="text-xs">Hello, {user.name}</div>
                    <div className="font-semibold">Account & Lists</div>
                  </div>
                </button>
                <div className="absolute top-full right-0 mt-1 bg-white text-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-48">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                    Your Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                    Your Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={16} className="mr-2 inline" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-sm hover:text-orange-300 transition-colors">
                <LogIn size={16} className="mr-1" />
                <div className="text-left">
                  <div className="text-xs">Hello, Sign in</div>
                  <div className="font-semibold">Account & Lists</div>
                </div>
              </Link>
            )}

            {/* Orders */}
            <Link to="/orders" className="text-sm hover:text-orange-300 transition-colors">
              <div className="text-xs">Returns</div>
              <div className="font-semibold">& Orders</div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-center hover:text-orange-300 transition-colors relative">
              <ShoppingCart size={24} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
              <span className="ml-1 font-semibold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="max-w-screen-2xl mx-auto">
          <nav className="flex items-center space-x-8 text-sm">
            <Link to="/" className="hover:text-orange-300 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-orange-300 transition-colors">All Products</Link>
            <Link to="/category/electronics" className="hover:text-orange-300 transition-colors">Electronics</Link>
            <Link to="/category/fashion" className="hover:text-orange-300 transition-colors">Fashion</Link>
            <Link to="/category/home" className="hover:text-orange-300 transition-colors">Home & Kitchen</Link>
            <Link to="/category/books" className="hover:text-orange-300 transition-colors">Books</Link>
            <Link to="/category/sports" className="hover:text-orange-300 transition-colors">Sports</Link>
            <Link to="/addproduct" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors font-medium">+ Add Product</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}