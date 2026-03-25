import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SendOTP() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError("*Email is required"), setMsg("");
    }

    try {
      setLoading(true);
      setError("");
      setMsg("");
      const res = await API.post("/auth/send-otp", { email });

      console.log(res.data);
      if (res.data.success === false) {
        return setMsg(res.data.message), setError("");
      }
      
      localStorage.setItem("email", email);

      navigate("/verify-otp");

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
        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Enter your registerd email to receive an OTP
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-sm mb-3 text-center text-red-700">{error}</p>
        <p className="text-sm mb-3 text-center text-yellow-500">{msg}</p>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}