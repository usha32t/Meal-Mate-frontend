import React, { useEffect, useState } from "react";

interface Stats {
  users: number;
  meals_logged: number;
  audio_notes: number;
}

const AdminPanel: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(["Protein", "Carb", "Fat"]);
  const [newCategory, setNewCategory] = useState("");
  const [stats, setStats] = useState<Stats>({
    users: 0,
    meals_logged: 0,
    audio_notes: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch admin stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 10000);

    const bc = new BroadcastChannel("meal-updates");
    bc.onmessage = (event) => {
      if (event.data === "meal-logged") {
        fetchStats();
      }
    };

    return () => {
      clearInterval(interval);
      bc.close();
    };
  }, []);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (name: string) => {
    setCategories(categories.filter((c) => c !== name));
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.eatthis.com/wp-content/uploads/sites/4/2021/05/healthy-foods.jpg?quality=82&strip=1')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-xl max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-6 underline decoration-pink-500 underline-offset-8">
          🌿 Usha's Admin Panel
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold text-purple-700">{stats.users}</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-lg font-semibold">Meals Logged</h3>
            <p className="text-2xl font-bold text-green-600">{stats.meals_logged}</p>
          </div>
          <div className="bg-white shadow rounded p-4 text-center">
            <h3 className="text-lg font-semibold">Audio Notes</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.audio_notes}</p>
          </div>
        </div>

        {/* Manual Refresh */}
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchStats}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {loading ? "Refreshing..." : "🔄 Refresh Stats"}
          </button>
        </div>

        {/* Category Manager */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-purple-700">Manage Food Categories</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 mr-2 rounded w-full"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-6">
            {categories.map((cat) => (
              <li key={cat} className="mb-1 flex justify-between items-center">
                <span>{cat}</span>
                <button
                  onClick={() => handleDeleteCategory(cat)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin Only Note */}
        <div className="bg-yellow-100 p-4 rounded shadow text-sm text-gray-700">
          ⚠️ <strong>Admin Only:</strong> This panel is restricted to users with admin roles.
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;