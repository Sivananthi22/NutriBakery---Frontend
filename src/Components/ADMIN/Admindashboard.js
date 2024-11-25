import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [newOrderNotification, setNewOrderNotification] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    axios.get('http://localhost:5000/api/users/count')
      .then((res) => {
        if (isMounted) setTotalUsers(res.data.count);
      })
      .catch((error) => console.error('Error fetching total users:', error?.response?.data?.message || error.message));

    axios.get('http://localhost:5000/api/orders/count')
      .then((res) => {
        if (isMounted) setTotalOrders(res.data.count);
      })
      .catch((error) => console.error('Error fetching total orders:', error?.response?.data?.message || error.message));

    axios.get('http://localhost:5000/api/payments/total-revenue')
      .then((res) => {
        if (isMounted) setTotalRevenue(res.data.total);
      })
      .catch((error) => console.error('Error fetching total revenue:', error?.response?.data?.message || error.message));

    axios.get('http://localhost:5000/api/products/lowstock')
      .then((res) => {
        if (isMounted) setLowStockItems(res.data);
      })
      .catch((error) => console.error('Error fetching low stock items:', error?.response?.data?.message || error.message));

    axios.get('http://localhost:5000/api/contact/recent')
      .then((res) => {
        if (isMounted) setRecentMessages(res.data);
      })
      .catch((error) => console.error('Error fetching recent messages:', error?.response?.data?.message || error.message));

    const socket = io('http://localhost:5000');
    socket.on('newOrder', (order) => {
      if (isMounted) {
        setNewOrderNotification(`New order received from ${order.userDetails.name} with total Rs. ${order.totalAmount}`);
        setTimeout(() => {
          if (isMounted) setNewOrderNotification(null);
        }, 5000);
      }
    });

    return () => {
      setIsMounted(false);
      socket.disconnect();
    };
  }, [isMounted]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8 min-h-screen bg-gradient-to-br from-[#f5e8e4] to-[#d1d9e7]">
        <h1 className="text-4xl font-bold mb-8 text-[#915F57] font-Lobster">Admin Dashboard</h1>

        {newOrderNotification && (
          <div className="bg-gradient-to-r from-[#ee607e] to-[#e77393] text-white p-4 rounded-lg mb-6 shadow-lg animate-pulse">
            {newOrderNotification}
          </div>
        )}

        {lowStockItems.length > 0 && (
          <div className="bg-gradient-to-r from-[#ffeadb] to-[#f2c2c2] text-[#915F57] p-4 rounded-lg mb-6 shadow-lg">
            <strong>Low Stock Alert:</strong>
            <ul className="mt-2">
              {lowStockItems.map((item) => (
                <li key={item._id} className="text-sm">
                  {item.name}: Only {item.stock} left in stock
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#ffeadb] to-[#f2d3d3] p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105">
            <h2 className="text-3xl font-bold text-[#915F57]">{totalUsers}</h2>
            <p className="text-[#e77393] mt-2">Total Users</p>
          </div>

          <div className="bg-gradient-to-br from-[#ffeadb] to-[#f2d3d3] p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105">
            <h2 className="text-3xl font-bold text-[#915F57]">{totalOrders}</h2>
            <p className="text-[#e77393] mt-2">Total Orders</p>
          </div>

          <div className="bg-gradient-to-br from-[#ffeadb] to-[#f2d3d3] p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105">
            <h2 className="text-3xl font-bold text-[#915F57]">Rs. {totalRevenue}</h2>
            <p className="text-[#e77393] mt-2">Total Revenue</p>
          </div>

          <div className="bg-gradient-to-br from-[#ffeadb] to-[#f2d3d3] p-8 rounded-lg shadow-lg text-center transform transition hover:scale-105">
            <h2 className="text-3xl font-bold text-[#915F57]">{activeSubscriptions}</h2>
            <p className="text-[#e77393] mt-2">Active Subscriptions</p>
          </div>
        </div>

        <div className="mt-12 w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#915F57]">Recent Messages</h2>
          <div className="bg-gradient-to-br from-[#ffeadb] to-[#f2d3d3] p-6 rounded-lg shadow-lg">
            <ul className="space-y-4">
              {recentMessages.slice(0, 3).map((message) => (
                <li key={message._id} className="p-4 bg-white rounded-lg shadow transition transform hover:-translate-y-1">
                  <span className="text-lg font-semibold mb-1 text-[#915F57] block">{message.name}</span>
                  <p className="text-sm text-gray-700">{message.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
