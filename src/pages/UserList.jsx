import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "../features/userSlice";
import LogoutButton from "../components/LogoutButton";


const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  // const handleImagesUpload=(images, captions) =>{
  //   console.log("Uploaded Images:", images);
  //   console.log("Captions:", captions);


  // }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      dispatch(addUser(newUser));
      setNewUser({ name: "", email: "" });
    }
  };

  const handleEditUser = (id, name, email) => {
    const updatedName = prompt("Enter new name:", name);
    const updatedEmail = prompt("Enter new email:", email);

    if (updatedName && updatedEmail) {
      dispatch(updateUser({ id, name: updatedName, email: updatedEmail }));
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">User List</h1>
      <h2 className="text-2xl font-bold">Upload Images</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add User
          </button>
        </div>

        <LogoutButton />
      </div>

      {loading ? <p>Loading users...</p> : null}
      {error ? <p className="text-red-500">{error}</p> : null}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Id</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEditUser(user.id, user.name, user.email)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
