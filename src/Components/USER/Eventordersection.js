import React from 'react';
import { useNavigate } from 'react-router-dom';
import eventImage from '../Images/EventorderSbg.jpg'; // Replace with your image path

const EventOrdersSection = () => {
  const navigate = useNavigate();

  const handleNavigateToEventOrders = () => {
    navigate('/event-order'); // Adjust this route as needed
  };

  return (
    <section className="relative bg-gradient-to-br from-[#FFFAF5] to-[#FFEDE4] py-20 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-pattern opacity-10 z-0"></div>

      <div className="container mx-auto px-6 md:flex items-center justify-between relative z-10">
        {/* Image Section */}
        <div className="md:w-1/2 relative mb-12 md:mb-0">
          <div className="overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img
              src={eventImage}
              alt="Event Orders"
              className="w-full object-cover rounded-xl"
            />
          </div>
          {/* Decorative Gradient Circles */}
          <div className="absolute top-[-80px] left-[-60px] w-40 h-40 bg-gradient-to-br from-[#FFB4A2] to-[#FFCCB3] rounded-full blur-2xl opacity-50"></div>
          <div className="absolute top-10 right-[-40px] w-32 h-32 bg-gradient-to-br from-[#FCA89E] to-[#FEE4E2] rounded-full blur-2xl opacity-60"></div>
          <div className="absolute bottom-[-80px] left-[-40px] w-60 h-60 bg-gradient-to-br from-[#FEE4E2] to-[#FFB4A2] rounded-full blur-2xl opacity-40"></div>
          <div className="absolute bottom-[-120px] right-[-100px] w-48 h-48 bg-gradient-to-br from-[#FCA89E] to-[#FFE0D9] rounded-full blur-xl opacity-50"></div>
          <div className="absolute top-[-100px] right-[-80px] w-24 h-24 bg-gradient-to-br from-[#FFE0D9] to-[#FCA89E] rounded-full blur-lg opacity-50"></div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 md:pl-16 text-center md:text-left">
          <h2
            className="text-5xl md:text-6xl font-bold text-[#7A3E3F] mb-6 leading-tight"
            style={{ fontFamily: `'Pacifico', cursive` }}
          >
            Celebrate Sweet Moments
          </h2>
          <p
            className="text-lg md:text-xl text-[#5E3232] mb-8 leading-relaxed"
            style={{ fontFamily: `'Quicksand', sans-serif` }}
          >
            Whether it’s a wedding, corporate event, or birthday, Nutri Bakery’s
            delightful catering makes every occasion unforgettable.
          </p>
          <button
            onClick={handleNavigateToEventOrders}
            className="relative bg-gradient-to-r from-[#D45E5E] via-[#F08080] to-[#E67373] text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            style={{ fontFamily: `'Lobster', cursive` }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 blur-md rounded-full"></span>
            <span className="relative z-10">Plan Your Event</span>
          </button>



        </div>
      </div>

      {/* Additional Decorative Circles */}
      <div className="absolute top-10 left-10">
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-50"
        >
          <circle cx="75" cy="75" r="72" stroke="#FCA89E" strokeWidth="3" />
          <circle cx="75" cy="75" r="60" stroke="#FFB4A2" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-40 left-[-30px]">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          <circle cx="100" cy="100" r="95" stroke="#FFE0D9" strokeWidth="4" />
          <circle cx="100" cy="100" r="80" stroke="#FCA89E" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute bottom-[-50px] right-[-50px]">
        <svg
          width="250"
          height="250"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          <circle cx="125" cy="125" r="120" stroke="#FEE4E2" strokeWidth="5" />
          <circle cx="125" cy="125" r="100" stroke="#FFB4A2" strokeWidth="4" />
        </svg>
      </div>
      <div className="absolute bottom-[-80px] left-[-60px]">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-30"
        >
          <circle cx="150" cy="150" r="145" stroke="#FFCCB3" strokeWidth="6" />
          <circle cx="150" cy="150" r="125" stroke="#FFE0D9" strokeWidth="5" />
        </svg>
      </div>
    </section>
  );
};

export default EventOrdersSection;
