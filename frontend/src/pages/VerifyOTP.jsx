import { useState, useRef } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [lengthError,  setLengthError] = useState("");
  const [error,  setError] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return setLengthError("Enter full OTP!"), setError("");
    }

    try {
      setLengthError("")
      const res = await API.post("/auth/verify-otp", {
        email,
        otp: finalOtp,
      });

      if (res.data.success === false) {
          return setError(res.data.message)
      }
      console.log(res.data.message)
      navigate("/reset-password");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Sent OTP your registerd email, Please confirm your OTP here!
        </p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 text-center border rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
        <p className="text-sm mb-3 text-center text-red-500">{lengthError}</p>
        <p className="text-sm mb-3 text-center text-red-500">{error}</p>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Verify OTP
        </button>
      </form>
    </div>
  );
}