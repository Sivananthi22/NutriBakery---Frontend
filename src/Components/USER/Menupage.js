import React from 'react';
import { Link } from 'react-router-dom';
import croissantsImage from '../Images/pinkcroiss.jpg';
import cupcakesImage from '../Images/pinkcup.jpg';
import cakesImage from '../Images/pinkcake.jpg';
import bunsImage from '../Images/pinkbun.jpg';
import breadImage from '../Images/pinkbread.jpg'; // Add your bread image
import Navbar from '../Navbar';
import Footer from './Footer';

const MenuSection = () => {
  const [showAllProducts, setShowAllProducts] = React.useState(true); // Toggle between all products and subscription-based

  // Sample data including subscription-based products
  const menuItems = [
    { name: 'BREAD', image: breadImage, category: 'bread', isSubscription: true },
    { name: 'BUNS', image: bunsImage, category: 'buns', isSubscription: true },
    { name: 'CROISSANTS', image: croissantsImage, category: 'croissants', isSubscription: true },
    { name: 'CUPCAKES', image: cupcakesImage, category: 'cupcakes', isSubscription: false },
    { name: 'CAKES', image: cakesImage, category: 'cakes', isSubscription: false },
  ];

  // Filter products based on the selected view
  const displayedItems = showAllProducts
    ? menuItems
    : menuItems.filter((item) => item.isSubscription);

  return (
    <div className="bg-[#fedfda] min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-28 px-4">
        <h2 className="text-center text-[42px] font-bold text-[#915F57] mb-2" style={{ fontFamily: `'Lobster', cursive` }}>Explore our menu</h2>
        <p className="text-center text-[30px] text-[#d99583] mb-6 italic" style={{ fontFamily: `'Quicksand', sans-serif` }}>
          Browse our menu for a taste of perfection in every bite
        </p>

        {/* Toggle Buttons for All Products and Subscription-Based Products */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-3 mx-2 rounded-md text-lg font-semibold transition-all duration-300 ${
              showAllProducts ? 'bg-[#915F57] text-white' : 'bg-[#fefaf5] text-[#915F57] border border-[#d99583]'
            }`}
            style={{ fontFamily: `'Lobster', cursive` }}
            onClick={() => setShowAllProducts(true)}
          >
            All Products
          </button>
          <button
            className={`px-6 py-3 mx-2 rounded-md text-lg font-semibold transition-all duration-300 ${
              !showAllProducts ? 'bg-[#915F57] text-white' : 'bg-[#fefaf5] text-[#915F57] border border-[#d99583]'
            }`}
            style={{ fontFamily: `'Lobster', cursive` }}
            onClick={() => setShowAllProducts(false)}
          >
            Subscription-Based Products
          </button>
        </div>

        {/* Display the menu items based on the selected filter */}
        <div className="flex flex-wrap justify-center gap-6">
          {displayedItems.map((item, index) => (
            <Link key={index} to={`/products/${item.category}`} className="relative w-[380px] h-[550px] bg-[#fefaf5] rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[85%] object-cover rounded-t-lg border-b-2 border-[#a67c68]"
              />
              <div className="text-center text-[28px] font-bold text-[#915F57] py-4 uppercase" style={{ fontFamily: `'Pacifico', cursive` }}>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuSection;
