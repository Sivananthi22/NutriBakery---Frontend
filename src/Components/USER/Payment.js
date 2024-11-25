import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../Navbar';
import Footer from './Footer';

const stripePromise = loadStripe('pk_test_51Q9d2RRoHQV6Ja4fYvZg90YJOkUZqcXRxHO1LA3M0c7PWSWgBvnFpVKSBGZeujQefgBAGFSHTogXa8vEUten7jIV00Nk4e6ELb');

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { totalAmount = 0, userDetails = {}, orderedItems = [] } = state || {};

  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Generate a custom order ID
  const generateCustomID = async () => {
    try {
      console.log('Requesting custom order ID...');
      const response = await axios.get('http://localhost:5000/api/orders/custom-id?prefix=NBO');
      console.log('Generated Custom ID:', response.data.customID);
      return response.data.customID;
    } catch (error) {
      console.error('Error generating custom ID:', error.response?.data || error.message);
      return null;
    }
  };

  // Save order details
  const handleOrderSave = async (paymentMethod, paymentStatus) => {
    const token = localStorage.getItem('authToken');
    const customID = await generateCustomID();

    if (!customID) {
      console.error('Custom order ID generation failed. Cannot save order.');
      throw new Error('Failed to generate custom ID.');
    }

    const orderDetails = {
      orderID: customID,
      totalAmount,
      userDetails,
      orderedItems,
      paymentMethod,
      paymentStatus,
    };

    try {
      console.log('Saving order details to API...', orderDetails);
      const response = await axios.post('http://localhost:5000/api/orders/orders-and-payments', orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Order saved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving the order:', error.response?.data || error.message);
      throw error;
    }
  };

  // Handle Cash on Delivery
  const handleCashOnDelivery = async () => {
    setLoading(true);
    try {
      console.log('Initiating Cash on Delivery process...');
      const response = await handleOrderSave('Cash on Delivery', 'Pending');
      console.log('Cash on Delivery process completed:', response);

      setModalMessage(
        `Your order has been placed successfully! Your order ID is ${response.orderID}. You can track your order in the dashboard.`
      );
      setShowModal(true);
    } catch (error) {
      console.error('Error during COD process:', error.response?.data || error.message);
      alert('Failed to place the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Stripe Payment
  const handleStripePayment = async () => {
    setLoading(true);
    try {
      console.log('Starting Stripe payment process...');
      const response = await axios.post('http://localhost:5000/api/payments/create-checkout-session', {
        items: orderedItems.map((item) => ({
          name: item.productDetails.name,
          priceLKR: item.productDetails.price,
          quantity: item.quantity,
        })),
        totalAmountLKR: totalAmount,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        userID: userDetails._id,
      });

      console.log('Stripe session response:', response.data);

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error('Stripe checkout error:', result.error.message);
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error during Stripe payment:', error.response?.data || error.message);
      alert(`Failed to process payment: ${error.response?.data || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="payment-page-container flex flex-col items-center justify-center min-h-screen bg-[#f7d6e3] py-10">
        <h1 className="text-3xl font-bold mb-6">Review Your Payment</h1>
        <p className="text-xl mb-4">
          <strong>Total Amount:</strong> Rs. {totalAmount}
        </p>

        <div className="payment-options space-y-4 w-full max-w-md">
          <button
            className="w-full py-3 text-lg bg-[#915F57] text-white rounded-lg hover:bg-[#714421]"
            onClick={handleStripePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay with Stripe'}
          </button>

          <button
            className="w-full py-3 text-lg bg-[#bdf2ee] text-gray-800 rounded-lg hover:bg-[#95d2cc]"
            onClick={handleCashOnDelivery}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Cash on Delivery'}
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
              <p className="mb-4">{modalMessage}</p>
              <button
                className="py-2 px-4 bg-[#915F57] text-white rounded-lg hover:bg-[#915F57]/90"
                onClick={() => {
                  setShowModal(false);
                  navigate('/menu');
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
