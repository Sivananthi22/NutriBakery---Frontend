import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import backgroundImage from '../Images/Productbg.jpg'; // Replace with actual path to the image
import Footer from './Footer';

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null); // Track which product is being added
  const [showConfirmation, setShowConfirmation] = useState(false); // State to show confirmation message
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [category]);

  // Add to cart function
  const addToCart = async (productID) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { state: { from: `/products/${category}` } });
      return;
    }

    try {
      setAddingToCart(productID); // Start the animation
      await axios.post(
        'http://localhost:5000/api/cart',
        { productID, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowConfirmation(true); // Show confirmation message after animation
      setTimeout(() => setShowConfirmation(false), 2000); // Hide message after 2 seconds
      setTimeout(() => setAddingToCart(null), 1000); // End animation after 1 second
    } catch (error) {
      console.error('Failed to add product to cart:', error.response?.data || error.message);
      setAddingToCart(null);
    }
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn()) {
      addToCart(product.productID);
    } else {
      navigate('/login', { state: { productToAdd: product, from: `/products/${category}` } });
    }
  };

  const handleCustomizeClick = (product) => {
    navigate(`/customize`, { state: { product } });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffeef2' }}>
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-12">
        <h2 className="text-center text-5xl font-bold text-[#915F57] mb-8">{category.toUpperCase()}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.productID}
              className="relative group bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Animated Image */}
              <div className="relative">
                <img
                  src={product.imageUrl || backgroundImage} // Default image if not available
                  alt={product.name || 'Unnamed product'}
                  className={`w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 ${
                    addingToCart === product.productID ? 'animate-fly-to-username' : ''
                  }`}
                />
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-bold text-center mt-4 mb-4 text-[#5A3A21]">{product.name || 'No name available'}</h3>
                {product.stock <= 0 ? (
                  <p className="text-center text-red-600">Out of Stock</p>
                ) : product.stock <= 5 ? (
                  <p className="text-center text-orange-500">Low Stock</p>
                ) : (
                  <p className="text-center text-green-500">In Stock</p>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-gray-200 mb-4">{product.description || 'No description available'}</p>
                <p className="text-xl font-bold text-white mb-4">Rs. {product.price ? product.price.toFixed(2) : 'N/A'}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-[#915F57] text-white px-4 py-2 rounded hover:bg-[#6D4320] transition"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button
                    className="bg-[#915F57] text-white px-4 py-2 rounded hover:bg-[#6D4320] transition"
                    onClick={() => handleCustomizeClick(product)}
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="fixed top-16 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <p>Product added to cart!</p>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Animation Styles */}
      <style>
        {`
          .animate-fly-to-username {
            animation: fly-to-username 1s ease-in-out forwards;
          }

          @keyframes fly-to-username {
            0% {
              transform: scale(1) translateX(0) translateY(0);
              opacity: 1;
            }
            50% {
              transform: scale(0.5) translateX(30vw) translateY(-20vh);
              opacity: 0.8;
            }
            100% {
              transform: scale(0) translateX(70vw) translateY(-40vh);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductList;
