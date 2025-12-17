import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import TestHomepage from "./components/TestHomepage";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Addproducts from "./components/Addproducts";
import SimpleHeader from "./components/SimpleHeader";
import SimpleFooter from "./components/SimpleFooter";
import Profile from "./components/Profile";
import Orders from "./components/Orders";


function App() {
  const [cart, setCart] = useState([]);
  const [showDiscounts, setShowDiscounts] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SimpleHeader cart={cart} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<TestHomepage />} />
          <Route 
            path="/products" 
            element={
              <Products 
                cart={cart} 
                setCart={setCart} 
                showDiscounts={showDiscounts}
              />
            } 
          />
          <Route 
            path="/category/:category" 
            element={
              <Products 
                cart={cart} 
                setCart={setCart} 
                showDiscounts={showDiscounts}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={<Product cart={cart} setCart={setCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart}/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
          <Route path="/addproduct" element={<Addproducts/>}/>
          <Route 
            path="/buynow/:id" 
            element={
              <ProtectedRoute>
                <BuyNow />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      
      <SimpleFooter />
    </div>
  )
}

export default App
