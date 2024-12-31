import React, { useState } from "react";

function UserPage() {
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out!");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-50 via-white to-blue-50"
      }`}
    >
      <div
        className={`max-w-sm w-full shadow-lg rounded-lg overflow-hidden border transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`flex items-center justify-center p-4 ${
            darkMode ? "bg-gray-700" : "bg-blue-100"
          }`}
        >
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
        </div>
        <div className="p-4">
          <h2
            className={`text-xl font-semibold text-center transition-colors ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            John Doe
          </h2>
          <p
            className={`text-sm text-center mt-2 transition-colors ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            johndoe@example.com
          </p>
          <p
            className={`text-sm text-center mt-2 transition-colors ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            +123 456 7890
          </p>
        </div>
        <div
          className={`flex justify-around items-center p-3 border-t transition-colors ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"
          }`}
        >
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition duration-300 ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
            }`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors duration-300 ${
          darkMode
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-blue-200 text-blue-800 hover:bg-blue-300"
        }`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default UserPage;
