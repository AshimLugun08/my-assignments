import React, { useEffect, useState } from "react";
import axios from "axios";

const Userdata = () => {
  const [users, setUsers] = useState([]); // State to store all user data
  const [filteredUsers, setFilteredUsers] = useState([]); // State for displaying filtered users
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [count, setCount] = useState(0); // State for user count
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading state
        const response = await axios.get("http://localhost:3000/api/admin/getuser", {
          withCredentials: true, // Include cookies in the request
        });

        const fetchedUsers = response.data.user;
        setUsers(fetchedUsers); // Set all users
        setFilteredUsers(fetchedUsers); // Initially show all users
        setCount(fetchedUsers.length); // Set total user count
      } catch (err) {
        setError(err.message); // Capture and set error message
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchUsers();
  }, []);

  // Delete user functionality
  // Delete user functionality
const handleDeleteUser = async (id) => {
  try {
    // Find the user to be deleted
    const userToDelete = users.find((user) => user._id === id);

    // Check if the user is an admin
    if (userToDelete.role === "admin") {
     alert("cannot delete admin") // Set error for admin deletion attempt
      return; // Exit the function without making the API call
    }

    // Proceed with the delete API request if the user is not an admin
    const res = await axios.post(`http://localhost:3000/api/admin/delet/${id}`, null, {
      withCredentials: true, // Include cookies in the request
    });

    console.log(res);

    // Update the state to remove the deleted user
    const updatedUsers = users.filter((user) => user._id !== id);
    setUsers(updatedUsers); // Update the original user list
    setFilteredUsers(updatedUsers); // Update the filtered user list
    setCount(updatedUsers.length); // Update the user count
  } catch (err) {
    setError(err.message); // Capture and set error message
  }
};


  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase(); // Convert search input to lowercase
    setSearchQuery(query); // Update search query state

    // Filter users based on the search query
    const matchedUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    setFilteredUsers(matchedUsers); // Update filtered users list
  };

  if (loading) return <p className="m-8 text-xl text-gray-200">Loading...</p>; // Loading state
  if (error) return <p className="m-8 text-xl text-red-500">Error: {error}</p>; // Error state

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-3xl font-bold mb-4">Users ({count})</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <ul>
        {filteredUsers.map((user) => (
          <li
            key={user._id} // Use unique user ID from API
            className="p-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-700 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* No Results Message */}
      {filteredUsers.length === 0 && (
        <p className="text-gray-400 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default Userdata;
