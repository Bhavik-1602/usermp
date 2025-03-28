import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUsers } from "../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import Home from "./Home";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers()); // Ensure users are loaded
  }, [dispatch]);

  useEffect(() => {
    const user = users.find((user) => user.id.toString() === id);
    if (user) {
      setUserData({ name: user.name, email: user.email });
    }
  }, [users, id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple clicks
    setIsLoading(true); // Set loading state

    try {
      await dispatch(updateUser({ id, ...userData })).unwrap();
      navigate("/home"); // Redirect after successful update
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="w-full max-w-md p-8 bg-gray-300 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded-md focus:ring"
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded-md focus:ring"
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          {/* <button
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            type="submit" 
          >

            Update User
          </button> */}


          <button
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            type="submit"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          {/* <button
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            type="submit" 
          >

            Cancel
          </button> */}
          <button
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            type="button" // Change to type="button" to prevent form submission
            onClick={() => navigate("/home")} // Navigate back
          >Cancel</button>
        </form>
      </div>

    </div>
  );
};

export default EditUser;
