import { Link, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  const [cart, setCart] = useState([]);
   useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <>
    <div >
      <header>
      <Link to="/"><h1 className="bg-yellow-500">MERN Ecommerce Project </h1></Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      {localStorage.getItem("user") ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
     <main>
      <Routes>
      <Route path="/" element={<Products cart={cart} setCart={setCart}/>}/>
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={
        <ProtectedRoute>
        <Cart cart={cart} setCart={setCart}/>
        </ProtectedRoute>
        } />
      <Route path="/buynow/:id" element={
        <ProtectedRoute>
        <BuyNow />
        </ProtectedRoute>
        } />
      <Route path="/login" element={<Login />} />
      </Routes>
     </main>
    </div>
    </>
  )
}

export default App
