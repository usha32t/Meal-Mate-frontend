import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use res or remove variable to avoid TS warning
      await axios.post("http://localhost:5000/auth/register", formData);

      setMessage("Registration successful! Please log in.");
      setShowModal(true);
      setFormData({ email: "", password: "" });
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Registration failed.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url("https://tse1.mm.bing.net/th/id/OIP.zk8avcjfd6gewNwAz2gaDQHaEK?w=1060&h=596&rs=1&pid=ImgDetMain&o=7&rm=3")`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-95 shadow-md rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-gray-800 text-white px-6 py-4 rounded shadow-lg">
            <p>{message}</p>
            <button
              className="mt-3 bg-cyan-500 px-4 py-1 rounded"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
