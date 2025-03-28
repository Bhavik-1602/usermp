
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import LogoutButton from '../components/LogoutButton'
import Profile from "../New/Profile";
import "react-image-crop/dist/ReactCrop.css";
import EditUser from "./EditUser";


const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [editUser, setEditUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      dispatch(deleteUser(id));
    }
  };
  
      
 
  
  const handleEdit = (user) => {
    setEditUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    navigate(`/edit-user/${user.id}`);
  };
  
  const handleAddUser = () => {
    navigate('/add-user');
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: editUser.id, name: updatedName, email: updatedEmail }));
    setEditUser(null);
  };

  

  

  return (
      
    <div className="w-50%">
    <h2 className="text-2xl text-center font-bold mb-4">User Management</h2>
    
    {/* New Create/Add User Button */}
    <div className="flex justify-center mb-4">
      <button 
        onClick={handleAddUser}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create New User
      </button>
    </div>
        
 
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex justify-center">
          <table className="w-50% border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200" >
                <th className="border p-0.5">profile image </th>
                <th className="border p-0.5">Name</th>
                <th className="border p-0.5">Email</th>
                <th className="border p-0.5">Actions</th>
                
               
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border">
                  
                  <td className="px-6 py-4 border-b text-gray-800 text-sm">
                                    <Profile />
                                </td>
                  <td className="border p-1">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="px-4 py-2 text-center">
                   <div className="flex justify-center gap-2"> <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className=" px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

        )}
      

      {editUser && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="text-xl font-semibold">Edit User</h3>
          <input
            type="text"
            className="w-full p-2 border rounded mt-2"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="email"
            className="w-full p-2 border rounded mt-2"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      )}
      <br />
      <LogoutButton></LogoutButton>
      

  </div>
    
  );
};

export default Home;
