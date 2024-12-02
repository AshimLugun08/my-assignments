import React, { useState } from "react";
import Signin from "./signin.jsx";
import Signup from "./signup.jsx";

const AuthModal = ({setAuth}) => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up modals

  return (
    <div className="h-100 flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Header */}
        <div className="flex justify-between border-b pb-2 mb-4">
          <button
            onClick={() => setIsSignIn(true)}
            className={`text-lg font-bold ${
              isSignIn ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`text-lg font-bold ${
              !isSignIn ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        {isSignIn ? (
          <Signin setAuth={setAuth}/>
        ) : (
          // Sign Up Form
        <Signup setAuth={setAuth}/>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
