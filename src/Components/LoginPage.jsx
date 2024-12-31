import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Signup Form Validation
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(mobile)) {
        setMobileError("Please enter a valid 10-digit mobile number.");
        return;
      } else {
        setMobileError("");
      }

      if (!email || !mobile || !img || !password || !name) {
        alert("Please fill in all the required fields.");
        return;
      }

      const form = new FormData();
      form.append("email", email);
      form.append("mobile", mobile);
      form.append("message", message);
      form.append("name", name);
      form.append("password", password);
      form.append("img", img);

      try {
        const formDetails = await axios.post(
          "http://localhost:8000/server/form-routes/create-user",
          form,
          {withCredentials:true}
        );
        if (formDetails.status === 201) {
          navigate("/user-page");
        }
        console.log(formDetails);
      } catch (error) {
        console.log("Signup error:", error);
      }
    } else {
      // Login Form Submission
      if (!email || !password) {
        alert("Please fill in all the required fields.");
        return;
      }

      try {
        const loginDetails = await axios.post(
          "http://localhost:8000/server/form-routes/login",
          { email, password }
        );
        if (loginDetails.status === 200) {
          navigate("/user-page");
        }
        console.log(loginDetails);
      } catch (error) {
        console.log("Login error:", error);
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-black" : "bg-gray-50 text-black"
      } transition-colors`}
    >
      <div
        className={`w-full max-w-sm p-8 bg-white shadow-md rounded-md ${
          darkMode ? "bg-gray-800 text-black" : "text-black"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            } hover:bg-gray-500`}
          >
            {darkMode ? "🌙" : "🌞"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                  required
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {mobileError && (
                  <p className="text-red-500 text-xs">{mobileError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium">Upload File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {file && (
                  <div className="mt-3">
                    <img
                      src={file}
                      alt="File Preview"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-600 text-black font-semibold rounded-md focus:outline-none hover:bg-indigo-700"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-500 underline focus:outline-none"
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
