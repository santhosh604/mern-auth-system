import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow px-8 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold text-blue-600">
        MyApp
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}