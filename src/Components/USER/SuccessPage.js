import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust the path as needed
import Footer from './Footer'; // Adjust the path as needed

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to menu page after a brief delay
    setTimeout(() => {
      navigate('/menu');
    }, 3000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4E8DB]">
      <Navbar /> {/* Navbar at the top */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-[#915F57]">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mt-4">Thank you for your purchase. Your order has been confirmed.</p>
      </main>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default SuccessPage;
