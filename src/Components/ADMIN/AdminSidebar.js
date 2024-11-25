import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Menu icon (hamburger)

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed state
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing authentication tokens)
    navigate('/'); // Redirect to landing page
  };

  return (
    <div className={`flex flex-col h-screen bg-[#915F57] ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 shadow-lg`}>
      {/* Sidebar Header with Hamburger Icon */}
      <div className="p-4 flex items-center justify-between">
        <FaBars
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white cursor-pointer text-3xl"  // Increased size of hamburger icon
        />
      </div>

      {/* Sidebar Menu Items */}
      <ul className="flex flex-col space-y-4 mt-6 text-white">
        {/* Home Button */}
        <li className="sidebar-item">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-home text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Home</span>}
          </Link>
        </li>

        <li className="sidebar-item">
          <Link
            to="/admin-dashboard"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-tachometer text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Dashboard</span>}
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/order-maintainer"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-box text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Orders</span>}
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/productupload"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bxs-cake text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Products</span>}
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/user-management"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-user text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Customers</span>}
          </Link>
        </li>
        {/* Payment Management */}
        <li className="sidebar-item">
          <Link
            to="/payment-maintainer"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-credit-card text-2xl"></i>  {/* Icon for Payment */}
            {!isCollapsed && <span className="ml-4">Payments</span>}
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/admin-messages"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-message-square-detail text-2xl"></i> {/* Icon for Messages */}
            {!isCollapsed && <span className="ml-4">Messages</span>}
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/settings"
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#D1D9E7] hover:text-[#915F57] rounded transition-all duration-300 ease-in-out"
          >
            <i className="bx bx-cog text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Settings</span>}
          </Link>
        </li>

        <li className="sidebar-item mt-auto">
          <div
            className="flex items-center px-4 py-3 text-lg font-semibold hover:bg-[#EEB0B2] hover:text-[#E77E80] rounded transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleLogout}
          >
            <i className="bx bx-log-out text-2xl"></i>  {/* Increased icon size to text-2xl */}
            {!isCollapsed && <span className="ml-4">Logout</span>}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
