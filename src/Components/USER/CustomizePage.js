import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Navbar'; // Replace with your actual navbar component
import Footer from './Footer';
const CustomizePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {}; // Get the product details passed from the previous page

  const [dietaryPreference, setDietaryPreference] = useState('Veg'); // Default to Veg
  const [customOrder, setCustomOrder] = useState({
    productType: product.name || '',
    customizationOptions: {
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
    },
    pickupDate: '',
  });

  const handleChange = (e) => {
    setCustomOrder({
      ...customOrder,
      customizationOptions: { ...customOrder.customizationOptions, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Custom Order:', customOrder);
    navigate('/cart', { state: { customOrder } }); // Pass the customOrder to CartPage
  };

  const renderCustomizationOptions = () => {
    switch (product.category) {
      case 'Bread':
        return (
          <>
            <label className="block text-gray-700">
              Choose Bread Type:
              <select
                name="option1"
                value={customOrder.customizationOptions.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Bread Type</option>
                <option value="Sourdough">Sourdough</option>
                <option value="Whole Wheat">Whole Wheat</option>
                <option value="Rye">Rye</option>
                <option value="Multigrain">Multigrain</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Choose Loaf Size:
              <select
                name="option2"
                value={customOrder.customizationOptions.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Loaf Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Choose Crust Type:
              <select
                name="option3"
                value={customOrder.customizationOptions.option3}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Crust Type</option>
                <option value="Soft">Soft</option>
                <option value="Crispy">Crispy</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Dietary Preferences:
              <select
                name="option4"
                value={customOrder.customizationOptions.option4}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Dietary Preferences</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Vegan">Vegan</option>
                <option value="Sugar-Free">Sugar-Free</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Toast Level:
              <select
                name="option5"
                value={customOrder.customizationOptions.option5}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Toast Level</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Well-Done">Well-Done</option>
              </select>
            </label>
          </>
        );

      case 'Buns':
        return dietaryPreference === 'Veg' ? (
          <>
            <label className="block text-gray-700">
              Choose Veg Filling:
              <select
                name="option1"
                value={customOrder.customizationOptions.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Filling</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Paneer">Paneer</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Size of Bun:
              <select
                name="option2"
                value={customOrder.customizationOptions.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Bun Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Topping for Bun:
              <select
                name="option3"
                value={customOrder.customizationOptions.option3}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Topping</option>
                <option value="Sesame">Sesame</option>
                <option value="Poppy Seeds">Poppy Seeds</option>
                <option value="No Topping">No Topping</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Baking Style:
              <select
                name="option4"
                value={customOrder.customizationOptions.option4}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Baking Style</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Glazing Options:
              <select
                name="option5"
                value={customOrder.customizationOptions.option5}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Glazing</option>
                <option value="Egg Wash">Egg Wash</option>
                <option value="Butter Glaze">Butter Glaze</option>
                <option value="No Glaze">No Glaze</option>
              </select>
            </label>
          </>
        ) : (
          <>
            <label className="block text-gray-700">
              Choose Non-Veg Filling:
              <select
                name="option1"
                value={customOrder.customizationOptions.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Filling</option>
                <option value="Chicken">Chicken</option>
                <option value="Fish">Fish</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Size of Bun:
              <select
                name="option2"
                value={customOrder.customizationOptions.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Bun Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Topping for Bun:
              <select
                name="option3"
                value={customOrder.customizationOptions.option3}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Topping</option>
                <option value="Cheese">Cheese</option>
                <option value="Bacon">Bacon</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Baking Style:
              <select
                name="option4"
                value={customOrder.customizationOptions.option4}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Baking Style</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Glazing Options:
              <select
                name="option5"
                value={customOrder.customizationOptions.option5}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Glazing</option>
                <option value="Egg Wash">Egg Wash</option>
                <option value="Butter Glaze">Butter Glaze</option>
                <option value="No Glaze">No Glaze</option>
              </select>
            </label>
          </>
        );

      case 'Croissants':
        return (
          <>
            <label className="block text-gray-700">
              Filling Options:
              <select
                name="option1"
                value={customOrder.customizationOptions.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Filling</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Almond Paste">Almond Paste</option>
                <option value="Cheese">Cheese</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Croissant Size:
              <select
                name="option2"
                value={customOrder.customizationOptions.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Croissant Size</option>
                <option value="Mini">Mini</option>
                <option value="Regular">Regular</option>
                <option value="Large">Large</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Glazing Options:
              <select
                name="option3"
                value={customOrder.customizationOptions.option3}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Glazing</option>
                <option value="Butter Glaze">Butter Glaze</option>
                <option value="Egg Wash">Egg Wash</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Topping:
              <select
                name="option4"
                value={customOrder.customizationOptions.option4}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Topping</option>
                <option value="Powdered Sugar">Powdered Sugar</option>
                <option value="Almond Flakes">Almond Flakes</option>
                <option value="No Topping">No Topping</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Baking Style:
              <select
                name="option5"
                value={customOrder.customizationOptions.option5}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Baking Style</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
            </label>
          </>
        );

      case 'Cupcakes':
        return (
          <>
            <label className="block text-gray-700">
              Choose Cupcake Flavor:
              <select
                name="option1"
                value={customOrder.customizationOptions.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Flavor</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Red Velvet">Red Velvet</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Choose Icing Type:
              <select
                name="option2"
                value={customOrder.customizationOptions.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Icing</option>
                <option value="Buttercream">Buttercream</option>
                <option value="Whipped Cream">Whipped Cream</option>
                <option value="Cream Cheese">Cream Cheese</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Choose Toppings:
              <select
                name="option3"
                value={customOrder.customizationOptions.option3}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Topping</option>
                <option value="Sprinkles">Sprinkles</option>
                <option value="Nuts">Nuts</option>
                <option value="Fruit Pieces">Fruit Pieces</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Cake Size:
              <select
                name="option4"
                value={customOrder.customizationOptions.option4}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Size</option>
                <option value="Mini">Mini</option>
                <option value="Regular">Regular</option>
                <option value="Large">Large</option>
              </select>
            </label>
          </>
        );

      case 'Cakes':
        return (
          <>
            <label className="block text-gray-700">
              Choose Cake Flavor:
              <select
                name="option1"
                value={customOrder.customizationOptions.option1}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Flavor</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Red Velvet">Red Velvet</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Choose Cake Filling:
              <select
                name="option2"
                value={customOrder.customizationOptions.option2}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Filling</option>
                <option value="Cream">Cream</option>
                <option value="Jam">Jam</option>
                <option value="Fruit">Fruit</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Choose Icing Type:
              <select
                name="option3"
                value={customOrder.customizationOptions.option3}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Icing</option>
                <option value="Buttercream">Buttercream</option>
                <option value="Fondant">Fondant</option>
                <option value="Whipped Cream">Whipped Cream</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Cake Size:
              <select
                name="option4"
                value={customOrder.customizationOptions.option4}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Size</option>
                <option value="6 inches">6 inches</option>
                <option value="8 inches">8 inches</option>
                <option value="10 inches">10 inches</option>
              </select>
            </label>

            <label className="block text-gray-700">
              Toppings:
              <select
                name="option5"
                value={customOrder.customizationOptions.option5}
                onChange={handleChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Topping</option>
                <option value="Sprinkles">Sprinkles</option>
                <option value="Fruit">Fruit</option>
                <option value="Nuts">Nuts</option>
              </select>
            </label>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/home/sivananthi/Documents/UKI FINAL PROJECT/frontend/src/Components/Images/customizepage.jpg')] flex flex-col justify-center items-center">
      <Navbar />
      <div className="w-full max-w-xl bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-[#5A3A21] text-center mb-6">Begin Your Custom Order</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block text-gray-700">
            Choose Dietary Preference:
            <select
              name="dietaryPreference"
              value={dietaryPreference}
              onChange={(e) => {
                setDietaryPreference(e.target.value);
                setCustomOrder((prev) => ({
                  ...prev,
                  customizationOptions: {
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    option5: '',
                  },
                }));
              }}
              required
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </label>

          <label className="block text-gray-700">
            Choose Your Product Type:
            <input
              type="text"
              name="productType"
              value={customOrder.productType}
              placeholder="Product Type"
              required
              disabled
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            />
          </label>

          {/* Render additional customization options */}
          {renderCustomizationOptions()}

          <label className="block text-gray-700">
            Select Pickup or Delivery Date:
            <input
              type="date"
              name="pickupDate"
              value={customOrder.pickupDate}
              onChange={(e) => setCustomOrder({ ...customOrder, pickupDate: e.target.value })}
              required
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>
        </form>
      </div>
        {/* Footer Section */}
        <Footer /> {/* Footer added here */}
    </div>
  );
};

export default CustomizePage;
