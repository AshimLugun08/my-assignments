import React, { useState } from "react";
import axios from "axios";

const Signup = ({setAuth}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  console.log(JSON.stringify(import.meta.env.VITE_API_BASE_URL))
  
  const [secretKey, setSecretKey] = useState(""); // Separate state for secret key
  const [error, setError] = useState("");
console.log(JSON.stringify(secretKey))
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSecretKeyChange = (e) => {
    setSecretKey(e.target.value); // Update secretKey state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    

    // Validate the secret key if the role is admin
    if (formData.role === "admin" && JSON.stringify(secretKey) !== JSON.stringify(import.meta.env.VITE_API_BASE_URL)) {
      setError("Invalid secret key for admin role.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", formData,{ withCredentials: true });
      console.log(response.data);
      setAuth(false)
      alert("successful")
    } catch (error) {
      if (error.response) {
        console.error("Server Response:", error.response.data);
        setError(error.response.data.message || "Something went wrong");
      } else {
        console.error("Error:", error.message);
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {formData.role === "admin" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Secret Key</label>
            <input
              type="text"
              value={secretKey}
              onChange={handleSecretKeyChange} // Handle secret key changes
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
              placeholder="Enter the admin secret key"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
      
    </div>
  );
};

export default Signup;
