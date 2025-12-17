import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// Simple test components
function TestHeader() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold text-orange-400">ZOVAi.in - TEST</h1>
    </header>
  );
}

function TestProducts() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Products Page - Working!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <h3>Test Product 1</h3>
          <p>₹999</p>
        </div>
        <div className="border p-4 rounded">
          <h3>Test Product 2</h3>
          <p>₹1999</p>
        </div>
      </div>
    </div>
  );
}

function TestLogin() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Login Page - Working!</h2>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader />
      <main>
        <Routes>
          <Route path="/" element={<TestProducts />} />
          <Route path="/login" element={<TestLogin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;