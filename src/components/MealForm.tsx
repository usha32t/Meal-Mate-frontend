// src/components/MealForm.tsx
import React, { useState } from "react";

interface Meal {
  id: number;
  name: string;
  type: string;
  qty: number;
  cal: number;
}

interface MealFormProps {
  onAdd: (meal: Meal) => void;
}

const MealForm: React.FC<MealFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Breakfast");
  const [qty, setQty] = useState<number>(1);
  const [cal, setCal] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || qty <= 0 || cal <= 0) return;

    const newMeal: Meal = {
      id: Date.now(),
      name,
      type,
      qty,
      cal,
    };

    onAdd(newMeal);
    setName("");
    setQty(1);
    setCal(0);
  };

  return (
    <div className="max-w-md mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4">Log Your Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="e.g., Idly"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          min={1}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Calories"
          value={cal}
          onChange={(e) => setCal(Number(e.target.value))}
          min={0}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Log Meal
        </button>
      </form>
    </div>
  );
};

export default MealForm;
