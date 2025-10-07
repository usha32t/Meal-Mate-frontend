import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const Charts: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <h3>Calories Intake</h3>
      <Bar data={{ labels: ["B", "L", "D", "S"], datasets: [{ label: "Calories", data: [300, 400, 200, 150], backgroundColor: "#60A5FA" }] }} />
    </div>
    <div>
      <h3>Macros</h3>
      <Pie data={{ labels: ["Protein", "Carb", "Fat"], datasets: [{ data: [30, 50, 20], backgroundColor: ["#34D399","#FACC15","#F87171"] }] }} />
    </div>
  </div>
);

export default Charts;
