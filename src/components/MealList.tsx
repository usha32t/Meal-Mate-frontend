    // src/components/MealList.tsx
import React from "react";

interface Meal {
  id: number;
  name: string;
  type: string;
  qty: number;
  cal: number;
  audioUrl?: string;
}

interface MealListProps {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const MealList: React.FC<MealListProps> = ({ meals, setMeals }) => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.cal, 0);

  const deleteMeal = (id: number) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-3">Logged Meals</h2>
      <p className="mb-2">Total Meals Logged: {meals.length}</p>
      <p className="mb-4">Total Calories: {totalCalories}</p>

      {meals.length === 0 ? (
        <p className="text-gray-500">No meals logged yet.</p>
      ) : (
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li
              key={meal.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{meal.name}</div>
                <div className="text-sm text-gray-600">
                  {meal.type} – {meal.qty} qty – {meal.cal} cal
                </div>
                {meal.audioUrl && (
                  <audio controls src={meal.audioUrl} className="mt-2" />
                )}
              </div>
              <button
                className="text-red-600 hover:underline"
                onClick={() => deleteMeal(meal.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealList;
