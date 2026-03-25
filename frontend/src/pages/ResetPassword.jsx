import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      return setError("All fields are required!"), setPasswordError("");
    }

    if (form.password !== form.confirmPassword) {
      return setPasswordError("Passwords do not match!"), setError("");
    }

    try {
      setLoading(true);
      setError("")
      const res = await API.post("/auth/reset-password", {
        email,
        password: form.password
      });

      console.log(res.data);

      // clear stored email
      localStorage.removeItem("email");

      navigate("/"); // go to login

    } catch (err) {
      console.log(err.response?.data);
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
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
            >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        <p className="text-sm mb-3 text-center text-red-500">{error}</p>
        <p className="text-sm mb-3 text-center text-yellow-500">{passwordError}</p>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}