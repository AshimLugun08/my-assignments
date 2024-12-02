import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Userdata from "../components/userdata.jsx";
import Productdata from "../components/productdata.jsx";
import Createpost from "../components/createpost.jsx";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("posts");
  
  const user = useSelector((state) => state.Auth?.user?.data?.user);
  const navigate = useNavigate();

  // Redirect if the user is not an admin
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/"); // Redirect to home page if user is not admin
    }
  }, [user, navigate]);

  

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-900 min-h-screen text-white">
        {/* Main Section */}
        <div className="flex-grow m-8 space-y-4">
          <div className="flex space-x-4 text-2xl">
            <button
              className={`p-4 border rounded-xl ${
                activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-800"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={`p-4 border rounded-xl ${
                activeTab === "posts" ? "bg-blue-500 text-white" : "bg-gray-800"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Products
            </button>
          </div>

          <div className="bg-gray-800 p-6 border rounded-xl">
            {activeTab === "users" && <Userdata />}
            {activeTab === "posts" && <Productdata />}
          </div>
        </div>

        {/* Create Post Section */}
        <div className="w-100 md:w-1/3 h-80 bg-gray-800 m-8 mt-28 p-6 border rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-center">Create Post</h2>
         <Createpost/>
        </div>
      </div>
    </>
  );
};

export default Admindashboard;
