import axios from "axios";

// Base URL configuration (optional, use if all APIs share a base URL)
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Fetch users
export const fetchUsers = async () => {
  try {
    const response = await api.get("/api/admin/getuser");
    return response.data; // Adjust based on API response structure
  } catch (error) {
    throw error; // Re-throw error for handling in calling function
  }
};

// Fetch products
export const fetchProducts = async () => {
  try {
    const response = await api.get("/product");
    return response.data; // Adjust based on API response structure
  } catch (error) {
    throw error;
  }
};
