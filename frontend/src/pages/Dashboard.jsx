import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setUser(res.data.user);
        }
        navigate("/login");
      
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Welcome 🎉
          </h2>

          <p>
            <strong>{user?.name}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}