import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin-dashboard");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear old errors

    try {
      const res = await fetch(
        "https://siddhbabatemplebackend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login Successful! Welcome to Admin Panel.");
        localStorage.setItem("adminToken", "true");
        setUsername("");
        setPassword("");
        navigate("/admin-dashboard");
      } else {
        setError("❌ Invalid Username or Password");
      }
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again.");
      console.error("Login error: ", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleChange = (e) =>{

  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center">
      <Link
        to="/"
        className="fixed top-2 left-2 inline-flex items-center gap-2 py-2 px-4 bg-primary/15 rounded-sm text-base font-semibold text-primary/80 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline-block">Back to Home</span>
      </Link>
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-xl overflow-hidden bg-white mx-8">
        {/* Left Section */}
{/* Left Section */}
<div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-orange-600 to-yellow-500 text-white relative p-10">
  {/* Subtle Overlay */}
  <div className="absolute inset-0 bg-black/10"></div>

  {/* Content */}
  <div className="relative max-w-md text-center space-y-6">
    {/* Icon / Symbol */}
    <div className="flex justify-center">
      <div className="bg-white/20 p-5 rounded-full shadow-lg">
        <span className="text-5xl">🪔</span>
      </div>
    </div>

    <h1 className="text-4xl font-bold leading-snug drop-shadow-md">
      Shree Siddh Baba Dham <br /> <span className="text-yellow-200">Madeli</span>
    </h1>

    <p className="px-6 text-white/90 text-base leading-relaxed">
      Welcome to the Admin Panel.  
      Easily manage <span className="font-semibold">events</span>,  
      <span className="font-semibold"> temple updates</span>, and  
      <span className="font-semibold"> records</span>.
    </p>

    {/* Decorative Divider */}
    <div className="w-20 h-1 mx-auto bg-yellow-300 rounded-full"></div>

    {/* Quote */}
    <p className="mt-6 bg-white/15 rounded-xl mx-auto px-6 py-3 w-fit text-sm shadow-lg backdrop-blur-md">
      ✨ "Organization brings devotion closer" ✨
    </p>
  </div>
</div>


        {/* Right Section */}
        <div className="flex justify-center items-center p-8 sm:p-16 md:m-8">
          <div className="w-full max-w-sm">
            <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
              Admin Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-xs text-center text-gray-400 mt-6">
              © {new Date().getFullYear()} Shree Siddh Baba Dham Madeli. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="mt-6 text-sm text-gray-600">
        Designed by{" "}
        <a
          href="https://cammellia.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600/75 hover:underline font-medium"
        >
          Bhupendra Nirmalkar
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
