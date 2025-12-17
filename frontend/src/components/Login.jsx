import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (email && name) {
      const user = {
        email: email,
        name: name,
        age: "",
        gender: "",
        phone: "",
        address: ""
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login to ZOVAi.in</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
