import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    // Clear user session (example for JWT/localStorage based auth)
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
     <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-black opacity-120"
        style={{
          backgroundImage:
            "url(https://mlkkvozl3ctg.i.optimole.com/q1aBEaE-Q-n8-c5W/w:auto/h:auto/q:auto/https://puresimpleeats.com/wp-content/uploads/2020/10/The-Five-Foundations-of-Nutritional-Balance.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>


      {/* Logout button on top-right */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-lg text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to MealMate
          </h1>
          <p className="mb-6 text-lg font-medium text-gray-800">
            Your personal AI-powered meal and nutrition tracker. Log your food,
            track calories, and receive healthy recommendations instantly.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded shadow-lg"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="bg-white border border-green-600 text-green-600 px-5 py-3 rounded hover:bg-green-50 shadow-lg"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
