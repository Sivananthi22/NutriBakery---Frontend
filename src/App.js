import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Landingpage';
import ChefsSpecialties from './Components/USER/Chefspecialitiy.js';
import UserDashboard from './Components/USER/Userdashboard';
import ContactUs from './Components/USER/Contactus';
import MenuSection from './Components/USER/Menupage';
import ProductList from './Components/USER/Productlist';
import CustomizePage from './Components/USER/CustomizePage';
import CartPage from './Components/USER/Cartpage';
import LoginPage from './Components/LoginPage'; // Importing LoginPage
import AdminDashboard from './Components/ADMIN/Admindashboard';
import OrdersMaintainer from './Components/ADMIN/Ordermaintain';
import Productsupload from './Components/ADMIN/Productsupload';
import UserManagement from './Components/ADMIN/Usermanagement';
import SettingsPage from './Components/ADMIN/SettingsPage';
import PaymentMaintainer from './Components/ADMIN/Paymentmaintain.js';
import ProtectedRoute from './Components/ProtectedRoutes.js'; // Importing ProtectedRoute
import BlogPage from './Components/USER/BlogPage.js'; // Blog page with sidebar integrated
import SubmitBlog from './Components/USER/BlogSubmitPage.js'; // Blog submission form
import SingleBlogPage from './Components/USER/SingleBlogPage.js';
import OrderSummary from './Components/USER/OrderSummary.js';
import PaymentPage from './Components/USER/Payment.js';
import EventOrdersPage from './Components/USER/EventorderPage.js';
import ReviewPage from './Components/USER/ReviewPage.js';
import AdminMessages from './Components/ADMIN/Messages.js';
import SuccessPage from './Components/USER/SuccessPage.js';
import CancelPage from './Components/USER/CancelPage.js';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/chef" element={<ChefsSpecialties />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/menu" element={<MenuSection />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/customize" element={<CustomizePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/submit-blog" element={<SubmitBlog />} />
        <Route path="/blog/:id" element={<SingleBlogPage />} /> {/* Dynamic route for individual blog */}
        <Route path="/summary" element={<OrderSummary />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/event-order" element={<EventOrdersPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        {/* Protected routes */}
        {/* Protect User Dashboard for 'user' role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleRequired="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protect Admin routes for 'admin' role */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-maintainer"
          element={
            <ProtectedRoute roleRequired="admin">
              <OrdersMaintainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute roleRequired="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute roleRequired="admin">
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productupload"
          element={
            <ProtectedRoute roleRequired="admin">
              <Productsupload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-maintainer"
          element={
            <ProtectedRoute roleRequired="admin">
              <PaymentMaintainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-messages"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminMessages/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
