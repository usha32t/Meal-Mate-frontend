import React from "react";

const Aitip: React.FC = () => {
  // Hardcoded suggestions
  const suggestions = [
    "Include more greens in your meals.",
    "Watch your sugar intake."
  ];

  return (
    <div>
      <h3 className="text-md font-semibold mb-2">AI Suggestion</h3>
      <ul className="text-sm list-disc list-inside">
        {suggestions.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Aitip;

