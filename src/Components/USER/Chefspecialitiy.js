import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChefsSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/specialties');
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error.message);
        setError(error.response?.data?.message || 'Error fetching specialties');
        setSpecialties([]);
      }
    };

    const checkLoggedInUser = () => {
      const username = localStorage.getItem('username');
      setLoggedInUser(username);
    };

    fetchSpecialties();
    checkLoggedInUser();
  }, []);

  const nextItems = () => {
    if (currentIndex < specialties.length - 3) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const prevItems = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) =>
      operation === 'increment' ? prevQuantity + 1 : prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const handleAddToCart = (product) => {
    if (!loggedInUser) {
      navigate('/login');
    } else {
      const cartItem = {
        productID: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };

      setPopupMessage(`${cartItem.name} added to cart!`);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="chef-specialties flex flex-col justify-center items-center py-12 relative" style={{ backgroundColor: '#ffffff' }}>
      {/* Main content */}
      <div className="container mx-auto max-w-[1600px] text-center mb-10">
        <h2 className="text-5xl font-bold text-[#915f57] leading-snug" style={{ fontFamily: 'Lobster', fontStyle: 'italic' }}>
          Chef's Specialties
        </h2>
        <p className="text-[#915f57] mt-2 text-lg italic" style={{ fontFamily: 'Quicksand', fontStyle: 'italic' }}>
          Elevate your dessert experience with our chef's handpicked treasures
        </p>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}

      <div className="container mx-auto px-4 max-w-[1600px]">
        {specialties.length === 0 && !error ? (
          <p className="text-center text-[#EEB0B2]" style={{ fontFamily: 'Quicksand', fontStyle: 'italic' }}>
            No specialties selected by the admin yet.
          </p>
        ) : (
          <div className="flex items-center justify-center relative">
            {/* Left Arrow */}
            <button
              onClick={prevItems}
              className="absolute left-0 z-20 p-4 bg-[#915F57] text-white rounded-full hover:bg-[#E77E80] disabled:opacity-50 text-2xl"
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </button>

            {/* Carousel Items */}
            <div className="flex space-x-6 justify-center w-full">
              {specialties.slice(currentIndex, currentIndex + 3).map((product) => (
                <div
                  key={product._id}
                  className="bg-[#F2D3D3] shadow-lg rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300 text-center relative"
                  style={{
                    width: '420px',
                    minHeight: '450px',
                    border: '3px solid #E77E80', // Outer border
                    borderRadius: '16px',        // Rounded corners
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow
                  }}
                >
                  {/* Corner Ribbon */}
                  <div className="absolute top-0 left-0 bg-[#915F57] text-white text-xs font-semibold px-3 py-1 rounded-br-lg" style={{ fontFamily: 'Lobster', fontStyle: 'italic' }}>
                    Chef's Choice
                  </div>

                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-64 w-full object-cover"
                    style={{
                      borderTopLeftRadius: '13px',
                      borderTopRightRadius: '13px',
                    }}
                  />

                  <div className="p-4 bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#F2D3D3] rounded-b-lg">
                    <h3 className="text-2xl text-[#915F57] font-semibold" style={{ fontFamily: 'Pacifico', fontStyle: 'italic' }}>
                      {product.name}
                    </h3>
                    <p className="text-[#E77E80] text-lg font-bold" style={{ fontFamily: 'Quicksand', fontStyle: 'italic' }}>
                      Rs. {product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <div className="flex items-center space-x-2 border border-[#915F57] rounded-md">
                        <button
                          onClick={() => handleQuantityChange('decrement')}
                          className="text-[#915F57] px-3 py-1 hover:text-[#E77E80]"
                        >
                          -
                        </button>
                        <span className="text-[#915F57] px-4 py-1">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange('increment')}
                          className="text-[#915F57] px-3 py-1 hover:text-[#E77E80]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-[#E77E80] to-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#EEB0B2] transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextItems}
              className="absolute right-0 z-20 p-4 bg-[#915F57] text-white rounded-full hover:bg-[#E77E80] disabled:opacity-50 text-2xl"
              disabled={currentIndex >= specialties.length - 3}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 space-x-2 relative z-10">
        {Array(Math.ceil(specialties.length / 3)).fill(0).map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === Math.floor(currentIndex / 3) ? 'bg-[#915F57]' : 'bg-[#E77E80] opacity-50'}`}
            onClick={() => setCurrentIndex(idx * 3)}
          ></button>
        ))}
      </div>

      {/* View Menu Button */}
      <div className="relative z-10 mt-10">
        <button
          onClick={handleViewMenu}
          className="mt-8 bg-gradient-to-r from-[#915F57] to-[#E77E80] text-white font-semibold px-8 py-3 rounded-full shadow-lg relative overflow-hidden group transition-transform duration-300 ease-out transform group-hover:-translate-y-1 group-hover:shadow-2xl animate-pulse hover:translate-y-[-0.25rem]"
          style={{ fontFamily: 'Lobster', fontStyle: 'italic', fontSize: '1.25rem' }}
        >
          <span className="relative z-20">View Full Menu</span>
        </button>
      </div>

      {/* Popup message */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-[#915F57] text-white p-4 rounded-lg shadow-lg z-20">
          {popupMessage}
        </div>
      )}
    </section>
  );
};

export default ChefsSpecialties;
