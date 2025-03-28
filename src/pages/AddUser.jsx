import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      // Remove the unnecessary 'addUser' constant
      await dispatch(addUser(userData)).unwrap();
      navigate("/home");
    } catch (error) {
      setError(error.message || "Failed to add user");
      console.error("Add user failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New User</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <button
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Adding User..." : "Add User"}
          </button>
          <button
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            type="button"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;