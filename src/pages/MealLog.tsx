import React, { useState } from "react";
import api from "../services/api"; // ✅ use api instead of axios
import { useMeals } from "../contexts/MealContext";

const MealLog: React.FC = () => {
  const { meals, fetchMeals } = useMeals();

  const [name, setName] = useState("");
  const [type, setType] = useState("Breakfast");
  const [calories, setCalories] = useState<number>(0);
  const [carbs, setCarbs] = useState<number | undefined>();
  const [protein, setProtein] = useState<number | undefined>();
  const [fat, setFat] = useState<number | undefined>();
  const [note, setNote] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newMeal = {
        name,
        category: type,
        calories,
        quantity: 1,
        carbs,
        protein,
        fat,
        note,
        timestamp: new Date().toISOString(),
      };

      // ✅ Use api.post instead of axios.post
      await api.post("/meals", newMeal);

      await fetchMeals();
      const bc = new BroadcastChannel("meal-updates");
      bc.postMessage("meal-logged");
      bc.close();

      alert("✅ Meal logged successfully!");
      setName("");
      setType("Breakfast");
      setCalories(0);
      setCarbs(undefined);
      setProtein(undefined);
      setFat(undefined);
      setNote("");
    } catch (error: any) {
      console.error("Error logging meal:", error?.response?.data || error.message);
      alert("❌ Failed to log meal.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;
    try {
      await api.delete(`/meals/${id}`); // ✅ use api.delete
      await fetchMeals();
      const bc = new BroadcastChannel("meal-updates");
      bc.postMessage("meal-logged");
      bc.close();
    } catch (error) {
      alert("❌ Failed to delete meal.");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://vitaminseaseaweed.com/cdn/shop/articles/heavy-metals-detox-smoothie.jpg?v=1694710650&width=1100')",
      }}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-4 rounded shadow bg-opacity-90"
        >
          <h2 className="text-xl font-bold">Log a Meal</h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Oats with Banana"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Calories"
            required
          />

          <input
            type="number"
            value={carbs || ""}
            onChange={(e) => setCarbs(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Carbs (optional)"
          />

          <input
            type="number"
            value={protein || ""}
            onChange={(e) => setProtein(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Protein (optional)"
          />

          <input
            type="number"
            value={fat || ""}
            onChange={(e) => setFat(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Fat (optional)"
          />

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Note (optional)"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Submit Meal
          </button>
        </form>

        {/* Logged meals with delete button */}
        <div className="bg-white p-4 rounded shadow bg-opacity-90">
          <h3 className="text-lg font-bold mb-2">Your Logged Meals</h3>
          <ul className="space-y-2">
            {meals
              .slice()
              .reverse()
              .slice(0, 5)
              .map((meal) => (
                <li
                  key={meal.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div>
                    <strong>{meal.name}</strong> - {meal.calories} kcal (
                    {meal.category})
                  </div>
                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealLog;
