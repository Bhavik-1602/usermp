import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditUser from "./pages/EditUser.jsx";

import Profile from "./New/Profile.jsx";
import AddUser from "./pages/AddUser.jsx";
// import 'react-image-crop/dist/ReactCrop.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/add-user" element={<AddUser />} /> 

        <Route path="/profile" element={<Profile />} />

         
      </Routes>
    </Router>

  
  );
};

export default App;
