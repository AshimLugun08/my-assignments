import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const ProductDetail = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const location = useLocation();
  const navigate = useNavigate();

  // Access user information from Redux state
  const user = useSelector((state) => state.Auth?.user?.data?.user);

  // Check user role and redirect if necessary
  useEffect(() => {
    if (user?.role !== "user") {
      alert("Access denied. You must be a regular user.");
      navigate("/"); // Redirect to home page
    }
  }, [user, navigate]);

  const product = location.state; // Access passed product data

  const handleAddToCart = () => {
    alert("Added to cart successfully");
  };

  if (!product) {
    return <div className="text-center text-white">Product Not Found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-6 flex items-center justify-center">
        <div className="bg-white text-gray-800 border p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-gray-800 font-bold mb-4">Price: ₹{product.price}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
