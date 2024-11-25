import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const UserDashboard = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCustomizedProducts, setShowCustomizedProducts] = useState(false); // Default to non-customized products
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Cart data fetched:', response.data.cartItems); // Log the data
        setCartProducts(response.data.cartItems || []);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
        if (error.response) {
          if (error.response.status === 401) {
            alert('Your session has expired. Please log in again.');
            navigate('/login');
          } else {
            console.error('Server error:', error.response.data);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        setError('Failed to fetch cart data');
      }
    };

    fetchCartData();
  }, []);


  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product to proceed to checkout.');
      return;
    }
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    navigate('/summary');
  };

  const handleSelectProduct = (productID) => {
    setSelectedProducts((prev) =>
      prev.includes(productID)
        ? prev.filter((id) => id !== productID)
        : [...prev, productID]
    );
  };


  const handleQuantityChange = async (newQuantity, productID) => {
    if (newQuantity < 1) return;

    console.log('Updating quantity for product:', productID, 'to new quantity:', newQuantity);

    const updatedCartProducts = cartProducts.map((product) => {
      if (product.productID === productID) {
        const updatedProduct = {
          ...product,
          quantity: newQuantity,
          totalPrice: newQuantity * product.price,  // Update total price
        };
        return updatedProduct;
      }
      return product;
    });

    setCartProducts(updatedCartProducts);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put('http://localhost:5000/api/cart/updateQuantity', {
        productID,
        quantity: newQuantity,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Quantity update response:', response.data);
    } catch (error) {
      console.error('Failed to update quantity', error);
      setError('Failed to update quantity. Please try again.');
    }
  };


  const handleRemoveProduct = async (productID) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/cart/${productID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartProducts((prevProducts) =>
        prevProducts.filter((product) => product.productID !== productID) // Compare with productID
      );
    } catch (error) {
      console.error('Failed to remove product:', error);
      setError('Failed to remove product. Please try again.');
    }
  };


  const customizedProducts = cartProducts.filter(product => product.customizationDetails);
  const nonCustomizedProducts = cartProducts.filter(product => !product.customizationDetails);

  const displayedItems = showCustomizedProducts ? customizedProducts : nonCustomizedProducts;

  return (
    <div className="w-full min-h-screen bg-[#FAE1D2]">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-28 px-4">
        <h2 className="text-center text-[42px] font-bold text-[#5a4630] mb-2 font-sevillana">My Cart</h2>
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 border-b-4 ${!showCustomizedProducts ? 'border-b-[#915F57] text-[#915F57]' : 'border-transparent text-[#915F57]'
              }`}
            onClick={() => setShowCustomizedProducts(false)}
          >
            Non-Customized Products
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 border-b-4 ${showCustomizedProducts ? 'border-b-[#915F57] text-[#915F57]' : 'border-transparent text-[#915F57]'
              }`}
            onClick={() => setShowCustomizedProducts(true)}
          >
            Customized Products
          </button>
        </div>

        <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8">
          {displayedItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedItems.map((product) => (
                product.productID ? (
                  <div key={product.productID} className="relative border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.productID)} // Compare with productID
                      onChange={() => handleSelectProduct(product.productID)} // Pass productID
                      className="absolute top-2 left-2"
                    />

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                      {product.customizationDetails && (
                        <p className="text-gray-500">Customized: {product.customizationDetails}</p>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-gray-800 font-bold">Unit Price: Rs. {product.price}</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(product.quantity - 1, product.productID)}
                            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(product.quantity + 1, product.productID)}
                            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-gray-800 font-bold">Total: Rs. {product.totalPrice}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveProduct(product.productID)}
                      className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <p key={product.productID} className="text-center text-red-600">Product data is missing</p>
                )
              ))}
            </div>

          )}
        </div>

        <div className="mt-8 border-t pt-4 w-full max-w-7xl text-right">
          <p className="text-lg font-bold text-gray-800">
            Subtotal: Rs.{' '}
            {selectedProducts.reduce((sum, id) => {
              const product = cartProducts.find((p) => p.productID === id);  // Find the full product object
              return product ? sum + product.totalPrice : sum;  // Add the total price of the product
            }, 0)}
          </p>
          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-2 bg-[#915F57] text-white font-bold rounded-lg hover:bg-[#714421] transition-colors"
          >
            Checkout
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
