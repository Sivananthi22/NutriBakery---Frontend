import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const PaymentMaintainer = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  // Function to update payment status
  const handleUpdateStatus = async (paymentId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/payments/${paymentId}/status`, { status: newStatus });
      setPayments(payments.map(payment => 
        payment._id === paymentId ? { ...payment, paymentStatus: newStatus } : payment
      ));
      setShowModal(false); // Close the modal after updating
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  // Function to open the confirmation modal
  const openModal = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-gradient-to-b from-[#FFF5EB] to-[#FFEDE4]">
        <h1 className="text-4xl font-bold text-[#915F57] mb-6">Payment Management</h1>

        {/* Payment Table */}
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden border border-[#915F57]">
            <thead className="bg-[#F4E8DB] border-b border-[#915F57]">
              <tr>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Payment ID</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">User</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Amount</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Payment Method</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Status</th>
                <th className="px-6 py-4 text-left text-[#915F57] border-r border-[#915F57]">Date</th>
                <th className="px-6 py-4 text-left text-[#915F57]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b border-[#f4e8db] hover:bg-[#fdf1ec] transition">
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{payment._id}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{payment.userID?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">Rs. {payment.amount}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{payment.paymentMethod}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{payment.paymentStatus}</td>
                  <td className="px-6 py-4 text-[#915F57] border-r border-[#915F57]">{new Date(payment.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {payment.paymentMethod === 'Cash on Delivery' && (
                      <button
                        className={`px-4 py-2 rounded-full ${
                          payment.paymentStatus === 'Paid' 
                            ? 'bg-[#915F57] text-white hover:bg-[#a0674b]' 
                            : 'bg-[#F2D3D3] text-[#915F57] border border-[#915F57] hover:bg-[#915F57] hover:text-white'
                        } transition duration-300`}
                        onClick={() => payment.paymentStatus === 'Paid' ? handleUpdateStatus(payment._id, 'Pending') : openModal(payment._id)}
                      >
                        {payment.paymentStatus === 'Paid' ? 'Paid' : 'Mark as Paid'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
              <h2 className="text-2xl font-bold text-[#915F57] mb-4">Confirm Payment</h2>
              <p className="text-gray-700 mb-4">Are you sure you want to mark this payment as paid?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#915F57] text-white rounded-md hover:bg-[#a0674b] transition duration-300"
                  onClick={() => handleUpdateStatus(selectedPaymentId, 'Paid')}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMaintainer;
