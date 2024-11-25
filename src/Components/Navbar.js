import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import logo from './Images/Logo In.png';

const Navbar = ({ isLandingPage }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setLoggedInUser(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setLoggedInUser(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isLandingPage && !isScrolled ? '' : 'bg-[#] bg-dots-pattern bg-dots-pattern-size'
      }`}
      style={{
        backgroundColor: isLandingPage && !isScrolled ? 'transparent' : '#fefaf5',
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between h-16">
        
        {/* Left-side Links */}
        <div className="hidden lg:flex space-x-10 absolute right-1/2 transform -translate-x-1/2 pr-1">
          <NavLink to="/" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Home</NavLink>
          <NavLink to="/menu" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Menu</NavLink>
          <NavLink to="/event-order" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Event Orders</NavLink>
        </div>

        {/* Logo in the Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
          <NavLink to="/">
            <img src={logo} alt="NutriBakery" className="h-28 w-auto" />
          </NavLink>
        </div>

        {/* Right-side Links */}
        <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 transform translate-x-1/2">
          <NavLink to="/blog" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Blog</NavLink>
          <NavLink to="/contact-us" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Contact Us</NavLink>
          <NavLink to="/reviews" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Reviews</NavLink>
        </div>

        {/* Right-side Buttons */}
        <div className="hidden lg:flex items-center space-x-6 ml-auto">
          {!loggedInUser ? (
            <button
              onClick={() => navigate('/login')}
              className="text-[#5A3A21] bg-gradient-to-r from-[#000000] to-[#ffffff] font-semibold px-10 py-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center space-x-2"
            >
              <FaUser />
              <span>Login</span>
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="text-[#5A3A21] bg-gradient-to-r from-[#e4cbb8] to-[#d1b891] font-semibold px-10 py-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <FaUser />
                <span>{loggedInUser}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#fefaf5] rounded-lg shadow-lg py-2 z-10">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="block w-full text-left px-4 py-2 text-sm text-[#5A3A21] hover:bg-[#e4cbb8] flex items-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Cart
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#5A3A21] hover:bg-[#e4cbb8] flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="text-[#5A3A21] cursor-pointer" onClick={toggleMenu}>
            <FaBars />
          </div>

          <div className="flex items-center space-x-4">
            {!loggedInUser ? (
              <button onClick={() => navigate('/login')} className="text-white bg-gradient-to-r from-[#e4cbb8] to-[#d1b891] px-3 py-2 rounded-lg flex items-center space-x-2 text-lg font-semibold transition duration-300">
                <FaUser />
                <span>Login</span>
              </button>
            ) : (
              <button onClick={handleProfileClick} className="text-white bg-gradient-to-r from-[#e4cbb8] to-[#d1b891] px-3 py-2 rounded-lg flex items-center space-x-2 text-lg font-semibold transition duration-300">
                <FaUser />
                <span>{loggedInUser}</span>
              </button>
            )}
          </div>
        </div>

        {/* Responsive Menu */}
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col items-center space-y-4 mt-4 w-full">
            <NavLink to="/menu" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Menu</NavLink>
            <NavLink to="/custom-orders" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Custom Orders</NavLink>
            <NavLink to="/about-us" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">About Us</NavLink>
            <NavLink to="/blog" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Blog</NavLink>
            <NavLink to="/contact-us" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Contact Us</NavLink>
            <NavLink to="/reviews" className="text-[#5A3A21] hover:text-[#d99583] transition duration-300 text-lg font-semibold">Reviews</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
