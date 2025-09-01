import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    }
  };

  // const handleChange = (e) =>{

  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-xl overflow-hidden bg-white">
        {/* Left Section */}
        <div className="hidden pt-24 md:flex flex-col justify-start items-start bg-gradient-to-br from-orange-500 to-yellow-400 text-white">
          <div className="max-w-lg">
            <h1 className="text-4xl text-center m-4 font-bold mb-3">
              Shree Siddh Baba Dham <br /> Madeli
            </h1>
            <p className="px-10 text-center text-white/90 text-base leading-relaxed">
              Welcome to the Admin Panel. Manage temple updates, events and
              devotee details easily from here.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center p-16 md:m-8">
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
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

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
