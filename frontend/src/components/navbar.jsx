import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "./auuthmodel"; // Ensure the correct file name
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Logout } from "../redux/authslice";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State for mobile menu
  const user = useSelector((state) => state.Auth?.user?.data?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        null,
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(Logout());
        navigate("/");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
          {/* Logo */}
          <div className="text-xl font-bold">
            <a href="/">Overlayes</a>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white absolute top-3 right-4 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-300 transition duration-200">
              Home
            </a>
            <a
              href="/product"
              className="hover:text-gray-300 transition duration-200"
            >
              Products
            </a>
            {user?.role === "admin" && (
              <a
                href="/admindashboard"
                className="hover:text-gray-300 transition duration-200"
              >
                Admin Dashboard
              </a>
            )}
          </div>

          {/* Sign In/Sign Up or Logout Button */}
          {!user ? (
            <button
              onClick={() => setShowAuthModal(true)}
              className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Sign In / Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Log Out
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {showMobileMenu && (
        <div className="fixed top-0 right-0 bg-white shadow-lg z-50 w-64 h-screen flex flex-col items-start py-4 px-4">
          {/* Close Button */}
          <button
            onClick={() => setShowMobileMenu(false)}
            className="text-gray-600 hover:text-gray-800 self-end"
          >
            &times;
          </button>

          {/* Mobile Menu Links */}
          <div className="mt-4 flex flex-col space-y-4  w-full">
            <a
              href="/"
              className="text-lg font-medium text-gray-800 hover:text-gray-600"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </a>
            <a
              href="/product"
              className="text-lg font-medium text-gray-800 hover:text-gray-600"
              onClick={() => setShowMobileMenu(false)}
            >
              Products
            </a>
            {user?.role === "admin" && (
              <a
                href="/admindashboard"
                className="text-lg font-medium text-gray-800 hover:text-gray-600"
                onClick={() => setShowMobileMenu(false)}
              >
                Admin Dashboard
              </a>
            )}
            {!user ? (
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowAuthModal(true);
                }}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign In / Sign Up
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Render the AuthModal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <AuthModal   setAuth={setShowAuthModal} />
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
