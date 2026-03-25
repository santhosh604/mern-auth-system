import { useState } from "react";
import API from "../api/axios"; 
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return setError("**All fields are required"), setMsg("");
    }

    // email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
        return setMsg("Provide valid Email!"), setError("")
    }

    // password strength validation
    if (form.password.length < 6) {
        return setMsg("Password too short!"), setError("")
    }


    try {
      setLoading(true);
      setMsg("")
      const response = await API.post("/auth/register", form);
      const bool = response.data.success
      if (bool === false) {
        return setMsg("This Email address already existed"), setError("")
      }

      navigate("/dashboard"); // go to login

    } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
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
          Create Account
        </h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          type="text"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-1 p-2 border rounded"
          onChange={handleChange}
        />
        <p className="text-sm mb-3 text-center text-red-700">{error}</p>
        <p className="text-sm mb-3 text-center text-yellow-700">{msg}</p>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account? {""}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}