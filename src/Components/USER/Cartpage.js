import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar'; // Import Navbar component
import Footer from './Footer'; // Import Footer component, adjust path if necessary

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customOrder = location.state?.customOrder || {}; // Get custom order details

  useEffect(() => {
    console.log('Customization Options:', customOrder.customizationOptions);
  }, [customOrder.customizationOptions]);

  const handleOrderMore = () => {
    navigate('/menu'); // Redirect to the MenuPage
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      const orderDetails = {
        productID: customOrder.productID,
        quantity: customOrder.quantity || 1,
        customizationOptions: customOrder.customizationOptions || {},
      };

      console.log('Order Details:', orderDetails);

      try {
        await axios.post('http://localhost:5000/api/cart', orderDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        navigate('/user-dashboard');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      navigate('/login', { state: { from: '/cart', customOrder } });
    }
  };

  const getCustomizationLabels = (category) => {
    switch (category) {
      case 'Bread': return ['Choose Bread Type', 'Choose Loaf Size', 'Choose Crust Type', 'Dietary Preferences', 'Toast Level'];
      case 'Buns': return ['Choose Filling', 'Size of Bun', 'Topping for Bun', 'Baking Style', 'Glazing Options'];
      case 'Croissants': return ['Filling Options', 'Croissant Size', 'Glazing Options', 'Topping', 'Baking Style'];
      case 'Cupcakes': return ['Choose Cupcake Flavor', 'Choose Icing Type', 'Choose Toppings', 'Cupcake Size'];
      case 'Cakes': return ['Choose Cake Flavor', 'Choose Cake Filling', 'Choose Icing Type', 'Cake Size', 'Toppings'];
      default: return [];
    }
  };

  const customizationLabels = getCustomizationLabels(customOrder.productType || '');

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-bg-image.jpg')" }}>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg my-12">
          <h2 className="text-4xl font-bold text-center text-[#5A3A21] mb-6">Your Custom Order Summary</h2>
          <div className="text-lg text-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Product Details</h3>
            {customOrder.productType && (
              <p className="mb-2"><strong>Product Type:</strong> {customOrder.productType}</p>
            )}
            {customizationLabels.map((label, index) => (
              <p key={index} className="mb-2">
                <strong>{label}:</strong> {customOrder.customizationOptions[label] || 'N/A'}
              </p>
            ))}
            {customOrder.pickupDate && (
              <p className="mb-2"><strong>Pickup or Delivery Date:</strong> {customOrder.pickupDate}</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
              onClick={handleOrderMore}
            >
              Order More
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default CartPage;
