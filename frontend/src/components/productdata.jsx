import React, { useEffect, useState } from "react";
import axios from "axios";

const Productdata = () => {
  const [products, setProducts] = useState([]); // All products from the API
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [count, setCount] = useState(0); // Total product count
  const [selectedCategory, setSelectedCategory] = useState(""); // Dropdown selected category

  // Fetch products data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:3000/product/getproduct", {
          withCredentials: true, // Include cookies in the request
        });

        const fetchedProducts = response.data; // Replace with actual API response structure
        setProducts(fetchedProducts); // Set all products
        setFilteredProducts(fetchedProducts); // Initially show all products
        setCount(fetchedProducts.length); // Set total count
      } catch (err) {
        setError(err.message); // Capture and set error message
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDeleteProduct = async (id) => {
    try {
      await axios.post(`http://localhost:3000/product/delete/${id}`, null, {
        withCredentials: true,
      });

      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts); // Update original products list
      setFilteredProducts(updatedProducts); // Update filtered list
      setCount(updatedProducts.length); // Update product count
    } catch (err) {
      setError(err.message); // Capture and set error message
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered); // Update filtered products
    }
  };

  if (loading) return <p className="m-8 text-xl text-white">Loading...</p>; // Loading state
  if (error) return <p className="m-8 text-xl text-red-400">Error: {error}</p>; // Error state

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Products ({count})</h2>

      {/* Dropdown for category selection */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Hoodie">Hoodie</option>
          <option value="Sweatshirt">Sweatshirt</option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Jacket">Jacket</option>
          <option value="Cardigan">Cardigan</option>
        </select>
      </div>

      {/* Product list */}
      <ul>
        {filteredProducts.map((product) => (
          <li
            key={product._id} // Use unique product ID from API
            className="p-2 border-b last:border-b-0 hover:bg-gray-800 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-300">Price: ₹{product.price}</p>
              <p className="text-gray-300">Category: {product.category}</p>
            </div>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-400 mt-4">No products found for the selected category.</p>
      )}
    </div>
  );
};

export default Productdata;
