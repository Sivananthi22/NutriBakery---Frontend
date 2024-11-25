import React, { useState } from 'react';
import Contact from '../Images/Contact.png'; // Image for the header
import Navbar from '../Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Error sending message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message.');
    }
  };

  return (
    <div className="bg-[#F4E8DB] min-h-screen flex flex-col">
      <Navbar /> {/* Ensure navbar is imported */}

      {/* Main Content */}
      <div className="flex-grow mt-20 flex flex-col items-center py-10 px-4">
        <header className="relative w-full max-w-[1600px]">
          <img src={Contact} alt="Bakery" className="w-full h-72 object-cover rounded-lg" />
          <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">Contact Us</h1>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-6 md:space-y-0 md:space-x-6 w-full max-w-[1600px]">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
            <h5 className="text-lg font-semibold text-[#915F57]">Phone Number</h5>
            <p className="text-gray-600">+94 77 338 7868</p>
            <h5 className="text-lg font-semibold text-[#915F57] mt-4">WhatsApp</h5>
            <p className="text-gray-600">+94 77 338 7868</p>
            <h5 className="text-lg font-semibold text-[#915F57] mt-4">Email</h5>
            <p className="text-gray-600">sivananthi226@gmail.com</p>
            <h5 className="text-lg font-semibold text-[#915F57] mt-4">Shop Address</h5>
            <p className="text-gray-600">Kopay North Kopay</p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-[#915F57] mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-[#915F57] font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#915F57] font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-[#915F57] font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-[#915F57] font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#915F57]"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-[#915F57] text-white rounded-lg font-bold hover:bg-[#7B4C2E] transition-colors">
                Send Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default ContactUs;
