import React from 'react'
import { useState } from 'react';

const Createpost = () => {
    const [postForm, setPostForm] = useState({ name: "", price: "", category: "" });


    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:3000/product/createproduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postForm),
          });
          const data = await response.json();
          if (data.success) {
            alert("Product created successfully!");
            setPostForm({ name: "", price: "", category: "" }); // Reset form
          } else {
            alert(data.message || "Error creating product");
          }
        } catch (error) {
          console.error("Error creating product:", error);
          alert("Error creating product");
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostForm({ ...postForm, [name]: value });
      };

  return (
    <form onSubmit={handleCreatePost} className="space-y-4 w-100 ">
            <div>
              <label className="block mb-1 text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={postForm.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Price</label>
              <input
                type="number"
                name="price"
                value={postForm.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Category</label>
              <select
                name="category"
                value={postForm.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-gray-700 text-white"
                required
              >
                <option value="">Select a category</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Sweatshirt">Sweatshirt</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Jacket">Jacket</option>
                <option value="Cardigan">Cardigan</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600"
            >
              Create Product
            </button>
          </form>
  )
}

export default Createpost