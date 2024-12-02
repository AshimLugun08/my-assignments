import React from "react";

const BrandIntro = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      {/* Text Section */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Overlayes
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover a world of fashion that blends comfort and style. At Overlayes, we offer premium quality clothing for all occasions. Our
          designs are crafted to make you feel confident and elegant, every
          day.
        </p>
        <a
          href="/product"
          className="bg-green-500 text-white px-6 py-3 w-40 rounded-md hover:bg-green-400 transition duration-200"
        >
          Shop Now
        </a>
      </div>

      {/* Image Section */}
      <div className="relative md:w-1/2 p-8 flex justify-center">
        <img
          src="./../public/Banner.jpg"
          alt="Clothing Brand"
          className="rounded-lg shadow-lg max-w-full"
        />
      
      </div>
    </div>
  );
};

export default BrandIntro;
