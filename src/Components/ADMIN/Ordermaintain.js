import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const OrdersMaintainer = () => {
  const [normalOrders, setNormalOrders] = useState([]);
  const [eventOrders, setEventOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;
  const [activeTab, setActiveTab] = useState('Normal');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchNormalOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setNormalOrders(response.data);
      } catch (error) {
        console.error('Error fetching normal orders:', error.message);
      }
    };

    const fetchEventOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/eventorder');
        setEventOrders(response.data);
      } catch (error) {
        console.error('Error fetching event orders:', error.message);
      }
    };

    fetchNormalOrders();
    fetchEventOrders();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    activeTab === 'Normal'
      ? normalOrders.slice(indexOfFirstOrder, indexOfLastOrder)
      : eventOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(
    activeTab === 'Normal' ? normalOrders.length / ordersPerPage : eventOrders.length / ordersPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const updateDeliveryStatus = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/delivery`, { status });
      setNormalOrders(normalOrders.map(order =>
        order.orderID === orderId ? { ...order, deliveryStatus: status } : order
      ));
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-gradient-to-b from-[#FFF5EB] to-[#FFEDE4]">
        <h1 className="text-4xl font-bold text-[#915F57] mb-6">Order Management</h1>

        {/* Tab Buttons */}
        <div className="flex mb-6">
          <button
            className={`px-6 py-2 rounded-lg ${activeTab === 'Normal' ? 'bg-[#915F57] text-white' : 'bg-[#FFF5EB] text-[#915F57]'} transition duration-200 mr-4`}
            onClick={() => {
              setActiveTab('Normal');
              setCurrentPage(1);
            }}
          >
            Normal Orders
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${activeTab === 'Event' ? 'bg-[#915F57] text-white' : 'bg-[#FFF5EB] text-[#915F57]'} transition duration-200`}
            onClick={() => {
              setActiveTab('Event');
              setCurrentPage(1);
            }}
          >
            Event Orders
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden border border-[#915F57]">
            <thead className="bg-[#F4E8DB] border-b border-[#915F57]">
              <tr>
                <th className="px-6 py-4 text-left text-[#915F57]">Order ID</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Name</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Address</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Phone Number</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Email</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Total Amount</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderID} className="border-b border-[#f4e8db] hover:bg-[#fdf1ec] transition">
                  <td className="px-6 py-4 text-[#915F57]">{order.orderID}</td>
                  <td className="px-6 py-4 text-[#915F57]">{order.userName}</td>
                  <td className="px-6 py-4 text-[#915F57]">{order.userAddress}</td>
                  <td className="px-6 py-4 text-[#915F57]">{order.userPhoneNumber}</td>
                  <td className="px-6 py-4 text-[#915F57]">{order.userEmail}</td>
                  <td className="px-6 py-4 text-[#915F57]">{order.totalAmount}</td>
                  <td className="px-6 py-4 space-y-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => openModal(order)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                      onClick={() => updateDeliveryStatus(order.orderID, 'Delivered')}
                    >
                      Mark as Delivered
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
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#915F57] hover:bg-[#7B4C2E]'
              } text-white transition duration-300`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-[#915F57] font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#915F57] hover:bg-[#7B4C2E]'
              } text-white transition duration-300`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Viewing Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <ul>
              {selectedOrder.orderedItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Product Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersMaintainer;
