import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ChefsSpecialties from './USER/Chefspecialitiy';
import BlogSection from './USER/Blogsection';
import Footer from './USER/Footer';
import heroImage1 from './Images/heros.jpg';
import heroImage2 from './Images/oneimage.jpg';
import heroImage3 from './Images/twoimage.jpg';
import heroImage4 from './Images/threeimage.jpg';
import heroImage5 from './Images/fourimage.jpg';
import heroImage6 from './Images/fiveimage.jpg';
import heroImage7 from './Images/siximage.jpg';
import heroImage8 from './Images/sevenimage.jpg';
import heroImage9 from './Images/eight image.jpg';
import heroImage10 from './Images/nineimage.jpg';
import leftImage from './Images/brownie2.png'; // Adjust the path as needed
import rightImage from './Images/macronshw.png'; // Adjust the path as needed
import EventOrdersSection from './USER/Eventordersection.js'; // Import the new Event Orders section

const images = [
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage5,
  heroImage6,
  heroImage7,
  heroImage8,
  heroImage9,
  heroImage10,
];

function Homepage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExploreMore = () => {
    navigate('/menu');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-container font-sans bg-[#fedfda]">
      <Navbar isLandingPage={true} />

      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Left Side - Text Content */}
        <div className="absolute left-0 w-1/2 h-full flex items-center justify-center z-10 p-12 pr-40">
          <div className="p-0 rounded-lg max-w-md">
            <h1 className="text-6xl font-extrabold leading-snug text-[#915F57]" style={{ fontFamily: 'Pacifico' }}>
              Discover the Art
              <span className="text-[#915F57]" style={{ fontFamily: 'Pacifico' }}>
                of Baking
              </span>
            </h1>

            <h2 className="text-3xl mt-4 font-bold tracking-wide leading-relaxed text-[#E77E80]" style={{ fontFamily: 'Playfair Display' }}>
              Where Every Bite Brings
              <span className="text-[#915F57]" style={{ fontFamily: 'Quicksand' }}>
                 Joy and Health
              </span>
            </h2>

            <p className="mt-6 text-xl text-[#915F57] leading-relaxed" style={{ fontFamily: 'Quicksand' }}>
              At Nutri Bakery, we carefully craft every treat with the finest ingredients, blending flavor and wellness to offer baked goods that feel as good as they taste.
            </p>
            <button
              className="mt-8 bg-gradient-to-r from-[#E77E80] to-[#915F57] text-white font-semibold px-8 py-3 rounded-full shadow-lg relative overflow-hidden group transition-transform duration-300 ease-out transform group-hover:scale-110 group-hover:shadow-2xl hover:animate-inflateButton"
              style={{ fontFamily: 'Lobster', fontSize: '1.25rem' }}
              onClick={handleExploreMore}
            >
              {/* Inner Glow Effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2D3D3] to-transparent opacity-80 rounded-full group-hover:animate-pulse transition-all duration-500"></span>

              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 ease-in-out">
                Discover Our Menu
              </span>

              {/* Border Animation */}
              <span className="absolute inset-0 rounded-full border-2 border-[#E77E80] group-hover:border-[#915F57] transition-all duration-500 ease-in-out animate-border-glow"></span>
            </button>



          </div>
        </div>

        {/* Curved Background with Dot Pattern */}
        <div className="absolute inset-y-0 right-0 w-[60vw] h-full bg-[#915F57] bg-dots-pattern bg-dots-pattern-size rounded-l-full overflow-hidden"></div>
        <div className="absolute inset-y-0 right-0 w-[56vw] h-full bg-[#ffffff] bg-dots-pattern bg-dots-pattern-size rounded-l-full overflow-hidden"></div>

        {/* Slideshow Background */}
        <div
          className="absolute inset-y-0 right-0 w-[52vw] h-full bg-[#F2D3D3] rounded-l-full overflow-hidden transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </section>

      <ChefsSpecialties />

      <EventOrdersSection /> {/* Include Event Orders Section */}

      <section className="how-it-works-section relative bg-[#ffffff] py-16 px-6 flex flex-col items-center overflow-hidden">
        {/* Decorative Images */}
        <img
          src={leftImage}
          alt="Top Left Decoration"
          className="absolute top-10 left-36 w-60 opacity-80 transform -translate-x-1/6 -translate-y-1/6"
          style={{ zIndex: 1 }}
        />
        <img
          src={rightImage}
          alt="Bottom Right Decoration"
          className="absolute bottom-10 right-36 w-60 opacity-80 transform translate-x-1/6 translate-y-1/6"
          style={{ zIndex: 1 }}
        />

        {/* Section Header */}
        <h2 className="text-5xl font-bold mb-16 text-[#915F57] relative z-10" style={{ fontFamily: 'Pacifico' }}>
          How It Works
        </h2>

        {/* Step-by-Step Full-Width Rows */}
        <div className="w-full max-w-4xl space-y-12 relative z-10">
          {/* Step 1 */}
          <div className="flex items-center bg-[#F4E8DB] rounded-lg shadow-md p-8 relative">
            <div className="absolute left-0 transform -translate-x-1/2 bg-[#915F57] text-white font-semibold text-lg rounded-full w-12 h-12 flex items-center justify-center" style={{ fontFamily: 'Lobster' }}>
              1
            </div>
            <span className="text-4xl mr-6 text-[#915F57]">🥐</span>
            <div>
              <h3 className="text-3xl font-semibold text-[#E77E80]" style={{ fontFamily: 'Lobster' }}>
                Select Your Favorites
              </h3>
              <p className="text-lg mt-2 text-[#915f57]" style={{ fontFamily: 'Quicksand' }}>
                Choose from a variety of wholesome and delicious treats tailored to your taste and health.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center bg-[#F4E8DB] rounded-lg shadow-md p-8 relative">
            <div className="absolute left-0 transform -translate-x-1/2 bg-[#915F57] text-white font-semibold text-lg rounded-full w-12 h-12 flex items-center justify-center" style={{ fontFamily: 'Lobster' }}>
              2
            </div>
            <span className="text-4xl mr-6 text-[#915F57]">🍞</span>
            <div>
              <h3 className="text-3xl font-semibold text-[#E77E80]" style={{ fontFamily: 'Lobster' }}>
                Freshly Prepared
              </h3>
              <p className="text-lg mt-2 text-[#915f57]" style={{ fontFamily: 'Quicksand' }}>
                Our chefs craft each order with premium ingredients to ensure a delightful experience.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center bg-[#F4E8DB] rounded-lg shadow-md p-8 relative">
            <div className="absolute left-0 transform -translate-x-1/2 bg-[#915F57] text-white font-semibold text-lg rounded-full w-12 h-12 flex items-center justify-center" style={{ fontFamily: 'Lobster' }}>
              3
            </div>
            <span className="text-4xl mr-6 text-[#915F57]">🚚</span>
            <div>
              <h3 className="text-3xl font-semibold text-[#E77E80]" style={{ fontFamily: 'Lobster' }}>
                Delivered to You
              </h3>
              <p className="text-lg mt-2 text-[#915f57]" style={{ fontFamily: 'Quicksand' }}>
                Get your order delivered fresh to your door, ready for you to enjoy anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BlogSection />
      <Footer />
    </div>
  );
}

export default Homepage;
