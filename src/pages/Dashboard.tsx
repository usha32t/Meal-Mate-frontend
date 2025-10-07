import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMeals } from "../contexts/MealContext";
import AITip from "../components/Aitip";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard: React.FC = () => {
  const { meals, fetchMeals } = useMeals();

  const user = {
    name: "Tellaboina usha",
    gender: "Female",
    calorieGoal: 1800,
    height: "5ft 4in",
    age: 20,
    weight: "40kg",
  };

  const today = new Date().toISOString().split("T")[0];
  const mealsToday = meals.filter((meal) => meal.timestamp?.startsWith(today));
  const caloriesToday = mealsToday.reduce((sum, meal) => sum + meal.calories, 0);
  const mealsLogged = meals.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getPastWeekData = () => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0];
      const dayMeals = meals.filter(
        (meal) => meal.timestamp?.startsWith(formattedDate)
      );
      const calories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0);
      return {
        date: formattedDate.slice(5),
        calories,
      };
    }).reverse();
  };

  const macroData = [
    { name: "Carbs", value: meals.reduce((sum, m) => sum + (m.carbs || 0), 0) },
    { name: "Proteins", value: meals.reduce((sum, m) => sum + (m.protein || 0), 0) },
    { name: "Fats", value: meals.reduce((sum, m) => sum + (m.fat || 0), 0) },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  useEffect(() => {
    fetchMeals();

    const bc = new BroadcastChannel("meal-updates");
    bc.onmessage = (event) => {
      if (event.data === "meal-logged") {
        fetchMeals();
      }
    };

    return () => {
      bc.close();
    };
  }, [fetchMeals]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.forbes.com/advisor/wp-content/uploads/2023/11/image1-34.jpg')",
      }}
    >
      <div className="min-h-screen bg-white bg-opacity-50">
        {/* Header */}
        <div className="bg-white bg-opacity-50 shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-700">MealMate 🍽️</h1>
          <div className="space-x-6">
            <Link to="/dashboard" className="text-blue-700 font-medium hover:underline">Dashboard</Link>
            <Link to="/meals" className="text-blue-700 font-medium hover:underline">Log</Link>
            <Link to="/admin-dashboard" className="text-blue-700 font-medium hover:underline">MealAdmin</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-3 bg-white bg-opacity-90 rounded-xl shadow p-6 flex flex-wrap justify-between gap-2">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Calorie Goal:</strong> {user.calorieGoal} kcal</div>
            <div><strong>Age:</strong> {user.age}</div>
            <div><strong>Gender:</strong> {user.gender}</div>
            <div><strong>Height:</strong> {user.height}</div>
            <div><strong>Weight:</strong> {user.weight}</div>
          </div>

          {/* Stats */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-90 rounded-xl shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Calories Today</h3>
              <p className="text-green-600 font-bold text-2xl">{caloriesToday}</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-xl shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Meals Logged</h3>
              <p className="text-blue-600 font-bold text-2xl">{mealsLogged}</p>
            </div>

            <div className="bg-white bg-opacity-90 rounded-xl shadow p-6">
              <AITip />
            </div>
          </div>

          <div className="flex justify-center col-span-3">
            <button
              onClick={fetchMeals}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              🔄 Refresh Meals
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-90 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Calories - Past 7 Days</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getPastWeekData()}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white bg-opacity-90 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Macronutrient Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={macroData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Meal History */}
        <div className="p-6">
          <div className="bg-white bg-opacity-90 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Meal History</h3>
            <ul className="divide-y divide-gray-200">
              {meals.slice(-5).reverse().map((meal, index) => (
                <li key={index} className="py-2 flex justify-between text-sm">
                  <span>{meal.name} ({meal.category}) - {meal.calories} kcal</span>
                  <span className="text-gray-500">
                    {meal.timestamp ? new Date(meal.timestamp).toLocaleString() : "Unknown time"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

