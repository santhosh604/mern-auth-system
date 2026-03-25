import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  console.log(import.meta.env.VITE_API_URL);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError("*All fields are required"), setMsg("");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      if (res.data.success === false) {
        return setMsg(res.data.message), setError("");
    
      }

      navigate("/dashboard"); // or dashboard later

    } catch (err) {
      console.log(err.response?.data);
      setMsg(err.response?.data?.message), setError("")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
           Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        <div className="flex justify-between items-center mb-3">
          <Link to="/send-otp" className="text-sm text-blue-500">
            Forgot Password?
          </Link>
        </div>

        <p className="text-sm my-2 text-center text-red-700">{error}</p>
        <p className="text-sm my-2 text-center text-yellow-500">{msg}</p>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}