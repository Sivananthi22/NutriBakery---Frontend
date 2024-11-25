import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users?page=${currentPage}&limit=8`);
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setErrorMessage('');
  };

  const handleSave = async () => {
    try {
      const updatedUser = await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        editingUser
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editingUser._id ? updatedUser.data : user))
      );

      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setErrorMessage('');
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-gradient-to-b from-[#FFF5EB] to-[#FFEDE4]">
        <h1 className="text-4xl font-bold text-[#915F57] mb-6">Manage Users</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-1/3 bg-white border border-[#915F57] text-[#915F57] rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E77E80] transition"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#F4E8DB] border-b border-[#915F57]">
              <tr>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">User ID</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Name</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Email</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Address</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Phone Number</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Role</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-[#f4e8db] hover:bg-[#fdf1ec] transition">
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{user.userID}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{user.username}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{user.email}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{user.address || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{user.phoneNumber || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition duration-300"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#915F57] hover:bg-[#7B4C2E]'
            } text-white transition duration-300`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-[#915F57] font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#915F57] hover:bg-[#7B4C2E]'
            } text-white transition duration-300`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-3xl font-bold text-[#915F57] mb-6">Edit User</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[#915F57] font-semibold">User ID</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-[#915F57] rounded-md bg-[#FFF5EB] focus:outline-none"
                    value={editingUser.userID}
                    onChange={(e) => setEditingUser({ ...editingUser, userID: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#915F57] font-semibold">Username</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-[#915F57] rounded-md bg-[#FFF5EB] focus:outline-none"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#915F57] font-semibold">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-[#915F57] rounded-md bg-[#FFF5EB] focus:outline-none"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#915F57] font-semibold">Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-[#915F57] rounded-md bg-[#FFF5EB] focus:outline-none"
                    value={editingUser.address}
                    onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#915F57] font-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-[#915F57] rounded-md bg-[#FFF5EB] focus:outline-none"
                    value={editingUser.phoneNumber}
                    onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[#915F57] font-semibold">Role</label>
                  <select
                    className="w-full p-3 border border-[#915F57] rounded-md bg-[#FFF5EB] focus:outline-none"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

              <div className="mt-6 flex space-x-4">
                <button
                  className="bg-[#915F57] text-white px-6 py-3 rounded-md hover:bg-[#7B4C2E] transition-all duration-300"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-all duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
