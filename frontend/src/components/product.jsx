import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShirtProductPage = () => {
  const [product, setProduct] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [sortOrder, setSortOrder] = useState(""); // State to track the selected sort order

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product/getproduct");
        console.log(res.data);
        setProduct(res.data); // Set all products
        setFilteredProducts(res.data); // Initially display all products
      } catch (error) {
        console.log("err", error);
      }
    };
    getProduct();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredProducts(product); // If search is empty, display all products
    } else {
      const filtered = product.filter((prod) =>
        prod.name.toLowerCase().includes(query.toLowerCase()) || 
        prod.category.toLowerCase().includes(query.toLowerCase()) // Filter by name or category
      );
      setFilteredProducts(filtered); // Update the filtered products
    }
  };

  // Handle sorting of products
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sortedProducts = [...filteredProducts]; // Create a copy of the filtered products

    if (order === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort by price (low to high)
    } else if (order === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort by price (high to low)
    }

    setFilteredProducts(sortedProducts); // Update the filtered and sorted products
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Overlayes Products</h1>

      {/* Search input field */}
      <div className="mb-6 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="mb-6 text-center">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={{
                pathname: `/product/${product.id}`,
              }}
              state={product} // Passing product data
              className="block bg-white text-gray-800 border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-800 font-bold">Price: ₹{product.price}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ShirtProductPage;
