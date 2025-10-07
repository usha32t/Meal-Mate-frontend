import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react"; // ✅ Type-only import
import axios from "../services/api";

interface Meal {
  id: number;
  name: string;
  category: string;
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  note?: string;
  timestamp?: string;
  audio_url?: string; // Optional: for audio note count
}

interface MealContextType {
  meals: Meal[];
  fetchMeals: () => Promise<void>;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const useMeals = (): MealContextType => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMeals must be used within a MealProvider");
  }
  return context;
};

interface MealProviderProps {
  children: ReactNode;
}

export const MealProvider: React.FC<MealProviderProps> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("/meals"); // Full path handled in axios baseURL
      setMeals(res.data);
    } catch (error) {
      console.error("❌ Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();

    const bc = new BroadcastChannel("meal-updates");
    bc.onmessage = (event) => {
      if (event.data === "meal-logged") {
        fetchMeals();
      }
    };

    return () => bc.close();
  }, []);

  return (
    <MealContext.Provider value={{ meals, fetchMeals }}>
      {children}
    </MealContext.Provider>
  );
};
