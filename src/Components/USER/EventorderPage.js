import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from './Footer';

const EventOrdersPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    products: [],
    instructions: '',
    date: null,
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productImage, setProductImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false); // State for success message

  // Chatbot states
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      setFormData({
        ...formData,
        products: [...formData.products, { product: selectedProduct, quantity, image: productImage }],
      });
      setSelectedProduct('');
      setQuantity(1);
      setProductImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('eventType', formData.eventType);
    formDataToSend.append('instructions', formData.instructions);
    formDataToSend.append('date', formData.date ? formData.date.toISOString() : '');

    formData.products.forEach((product, index) => {
      formDataToSend.append(`products[${index}][product]`, product.product);
      formDataToSend.append(`products[${index}][quantity]`, product.quantity);
      if (product.image) {
        formDataToSend.append(`products[${index}][image]`, product.image);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/eventorder/eventorder', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage(true); // Show success message
        setFormData({ name: '', email: '', eventType: '', products: [], instructions: '', date: null });

        // Hide the success message after 5 seconds
        setTimeout(() => setSuccessMessage(false), 5000);
      }
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
    }
  };
   // Handle chatbot message send
   const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user message to the chat
    setChatMessages((prev) => [...prev, { sender: 'user', message: userMessage }]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { query: userMessage });
      const botReply = response.data.reply;

      // Add bot reply to the chat
      setChatMessages((prev) => [...prev, { sender: 'bot', message: botReply }]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error.message);
    } finally {
      setUserMessage('');
    }
  };

  return (
    <div className="custom-orders-page bg-gradient-to-br from-[#FFFAF5] to-[#FFEDE4] min-h-screen relative overflow-hidden">
      <Navbar />
      {/* Circle Decorations */}
      <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-gradient-to-br from-[#FFB4A2] to-[#FFCCB3] rounded-full blur-2xl opacity-50"></div>
      <div className="absolute bottom-[-80px] right-[-60px] w-60 h-60 bg-gradient-to-br from-[#FEE4E2] to-[#FFB4A2] rounded-full blur-2xl opacity-40"></div>
      <div className="absolute top-40 right-[-40px] w-32 h-32 bg-gradient-to-br from-[#FCA89E] to-[#FEE4E2] rounded-full blur-2xl opacity-60"></div>
      <div className="absolute bottom-[-120px] left-[-100px] w-48 h-48 bg-gradient-to-br from-[#FCA89E] to-[#FFE0D9] rounded-full blur-xl opacity-50"></div>
      <div className="absolute top-[-100px] right-[-80px] w-24 h-24 bg-gradient-to-br from-[#FFE0D9] to-[#FCA89E] rounded-full blur-lg opacity-50"></div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A6E4A6] to-[#52D352] text-white px-8 py-4 rounded-lg shadow-lg z-50 animate-bounce">
          <p className="text-lg font-semibold text-center">
            🎉 Your custom order has been placed successfully! 🎉
          </p>
        </div>
      )}

      <div className="pt-16">
        <h1
          className="text-5xl text-center font-bold mb-10 text-[#915F57]"
          style={{ fontFamily: `'Lobster', cursive` }}
        >
          Plan Your Custom Orders
        </h1>

        <form
          className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg border-2 border-[#915F57] relative z-10"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-lg font-medium text-[#915F57] mb-2">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#915F57] mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-[#915F57] mb-2">Event Type</label>
            <input
              type="text"
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-[#915F57] mb-2">Date of Event</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
              placeholderText="Select event date"
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium text-[#915F57] mb-2">Add Products</label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Product Name"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
              />
              <input
                type="number"
                min="1"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
              />
              <input
                type="file"
                onChange={handleProductImageUpload}
                className="w-1/3 p-2 text-sm text-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#915F57]"
              />
              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-[#915F57] to-[#A0674B] text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
              >
                Add Product
              </button>
            </div>
          </div>

          {formData.products.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-[#915F57] mb-4">Selected Products</h3>
              <ul className="space-y-4">
                {formData.products.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                  >
                    <span className="text-[#915F57]">{item.product} - {item.quantity} pcs</span>
                    {item.image && (
                      <img
                        src={URL.createObjectURL(item.image)}
                        alt="Product"
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-lg font-medium text-[#915F57] mb-2">Special Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D45E5E] to-[#E67373] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          >
            Submit Order
          </button>
        </form>
      </div>
      

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default EventOrdersPage;
