import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MealLog from "./pages/MealLog";
import TestPage from "./pages/TestPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";

// ⬇️ Import the MealProvider
import { MealProvider } from "./contexts/MealContext";

function App() {
  return (
    <MealProvider> {/* Provide meal context to all routes */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route
            path="/meals"
            element={
              <PrivateRoute>
                <MealLog />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </MealProvider>
  );
}

export default App;
