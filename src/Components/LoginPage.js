import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import bgimage from './Images/bg.jpg';
import leaf01 from './Images/leaf_01.png';
import leaf02 from './Images/leaf_02.png';
import leaf03 from './Images/leaf_03.png';
import leaf04 from './Images/leaf_04.png';
import girl from './Images/Van.png';
import tree from './Images/trees.png';

function LoginPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [number, setNumber] = useState(''); // Add this state variable

  const productToAdd = location.state?.productToAdd;
  const from = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://nutri-bakery-backend.vercel.app/api/users/login', {
        email,
        password,
      });

      const { token, username, role, userID } = response.data;
      console.log("Login Response:", response.data);  // Log full response to see if userID is included

      // Save token, username, and userID in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userID', userID);  // Save userID
      console.log("Saved userID in local storage:", userID);  // Verify if userID is actually being saved

      if (productToAdd) {
        await addToCartAfterLogin(productToAdd);
        navigate(from || `/products/${productToAdd.category}`);
      } else {
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error in login:', error);
      setError('Invalid credentials. Please try again.');
    }
  };


  // Function to add the product to the cart after login
  const addToCartAfterLogin = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://nutri-bakery-backend.vercel.app/api/cart',
        { productID: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage(`${product.name} has been added to your cart!`);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://nutri-bakery-backend.vercel.app/api/users/signup', {
        username,
        email,
        password,
        phoneNumber: number, // Include contact number in the signup payload
      });
  
      setSuccessMessage(`Welcome to Nutri Bakery, ${username}! 🎉`);
      setShowSuccessModal(true);
      localStorage.setItem('username', username);
  
      // Clear the form fields after successful signup
      setUsername('');
      setEmail('');
      setPassword('');
      setNumber(''); // Clear phone number
    } catch (error) {
      console.error('Error in signup:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Error creating user. Please try again.');
    }
  };
  

  // Toggle between signup and login forms
  const handleShowSignup = () => {
    setIsLoginForm(false);
    setError('');
    setSuccessMessage('');
  };

  const handleShowLogin = () => {
    setIsLoginForm(true);
    setError('');
    setSuccessMessage('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section>
      <div className="leaves">
        <div className="set">
          <div><img src={leaf01} alt="leaf 1" /></div>
          <div><img src={leaf02} alt="leaf 2" /></div>
          <div><img src={leaf03} alt="leaf 3" /></div>
          <div><img src={leaf04} alt="leaf 4" /></div>
        </div>
      </div>
      <img src={bgimage} className="bg" alt="background" />
      <img src={girl} className="girl" alt="girl" />
      <img src={tree} className="trees" alt="trees" />
      <div className="login">
        <h2>{isLoginForm ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
          {!isLoginForm && (
            <div className="inputBox">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="inputBox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="number"
              placeholder="Contact number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="inputBox password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="inputBox">
            <input type="submit" value={isLoginForm ? 'Login' : 'Sign Up'} id="btn" />
          </div>
        </form>

        {error && <p className="text-danger text-center">{error}</p>}
        <div className="group">
          <a href="#" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </a>
        </div>

        {showSuccessModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>{successMessage}</p>
              <button onClick={() => navigate('/menu')}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LoginPage;
