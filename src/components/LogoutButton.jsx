import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="flex justify-center">
    <button onClick={handleLogout} className=   "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600   ">
      Logout
    </button>
    </div>
  );
};

export default LogoutButton;





