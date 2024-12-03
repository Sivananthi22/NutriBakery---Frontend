import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import backgroundImage from '../Images/front03.jpg';
import Footer from './Footer';

const OrderSummary = () => {
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartAndUserDetails = async () => {
      console.log('Fetching cart and user details...');
      const token = localStorage.getItem('authToken');

      try {
        const selectedItems = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        console.log('Selected Products from localStorage:', selectedItems);

        // Fetch the cart items
        const cartResponse = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched cart response:', cartResponse.data);

        // Filter cart items to only include selected products
        const selectedCartItems = cartResponse.data.cartItems.filter((item) =>
          selectedItems.includes(item.productID.toString())
        );
        console.log('Selected cart items:', selectedCartItems);

        // Fetch full product details for each selected item
        const cartWithProductDetails = await Promise.all(
          selectedCartItems.map(async (item) => {
            const productDetails = await axios.get(`http://localhost:5000/api/products/${item.productID}`);
            console.log(`Product details for item ${item.productID}:`, productDetails.data);
            return {
              ...item,
              productDetails: productDetails.data,
            };
          })
        );

        setCart(cartWithProductDetails);

        // Fetch user details
        const userResponse = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched user details:', userResponse.data);

        setUserDetails(userResponse.data);
      } catch (error) {
        console.error('Error fetching cart and user details:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchCartAndUserDetails();
  }, []);

  const handleUpdateUserDetails = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Updating user details...');
    try {
      await axios.put(
        'http://localhost:5000/api/users/updateAddress',
        { address: userDetails.address, phoneNumber: userDetails.phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('User details updated successfully.');
    } catch (error) {
      console.error('Error updating user details:', error);
      setError('Failed to update user details.');
    }
  };

  const handlePlaceOrder = async () => {
    console.log('Placing order...');
    const { address, phoneNumber } = userDetails;

    if (!address || !phoneNumber) {
      alert('Please provide your delivery address and phone number before placing the order.');
      return;
    }

    await handleUpdateUserDetails(); // Update user details before placing the order

    // Calculate total amount based on the selected products and quantities
    const totalAmount = cart.reduce((sum, item) => {
      const price = item.productDetails?.price || 0;
      const quantity = item.quantity || 0;
      return sum + price * quantity;
    }, 0);

    console.log('Total amount:', totalAmount);

    // Navigate to the payment page
    navigate('/payment', { state: { cart, userDetails, totalAmount, orderedItems: cart } });
  };

  const handleGoBack = () => {
    console.log('Navigating back...');
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="pt-20">
        <div className="flex flex-col items-center min-h-screen py-10 px-4">
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <div className="w-full max-w-2xl bg-[#FFF5EB]/80 backdrop-blur-lg rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-[#915F57] mb-4">My Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="col-span-2">
                  <strong>Name:</strong> {userDetails.name || 'N/A'}
                </p>
                <p className="col-span-2">
                  <strong>Email:</strong> {userDetails.email || 'N/A'}
                </p>

                <label className="block col-span-2 md:col-span-1">
                  <span className="text-[#915F57] font-semibold">Address</span>
                  <input
                    type="text"
                    value={userDetails.address}
                    onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-[#915F57] rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[#915F57]"
                    placeholder="Enter your delivery address"
                    required
                  />
                </label>

                <label className="block col-span-2 md:col-span-1">
                  <span className="text-[#915F57] font-semibold">Phone Number</span>
                  <input
                    type="text"
                    value={userDetails.phoneNumber}
                    onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-[#915F57] rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[#915F57]"
                    placeholder="Enter your phone number"
                    required
                  />
                </label>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#915F57] mb-4">Ordered Products</h3>
            <ul className="space-y-4 mb-6">
              {cart.map((item) => (
                <li key={item.productID} className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#915F57]">{item.productDetails.name}</h3>
                  <span className="text-center text-gray-600">x {item.quantity}</span>
                  <span className="text-[#915F57] font-semibold">
                    Rs. {item.productDetails.price}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-gray-600 mb-4">Shipping Fee: Free</p>
            <h3 className="text-2xl font-bold text-[#915F57] mb-6">
              Total: Rs.{' '}
              {cart.reduce((sum, item) => {
                const price = item.productDetails?.price || 0;
                const quantity = item.quantity || 0;
                return sum + price * quantity;
              }, 0)}
            </h3>

            <div className="flex justify-between space-x-4">
              <button
                onClick={handleGoBack}
                className="w-1/2 py-3 text-lg bg-[#F4E8DB] rounded-lg hover:bg-[#e5dcc7] text-[#915F57]"
              >
                Go Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="w-1/2 py-3 text-lg bg-[#915F57] text-white rounded-lg hover:bg-[#734520]"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSummary;
