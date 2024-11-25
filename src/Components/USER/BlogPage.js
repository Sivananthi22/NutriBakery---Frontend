import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Assuming you are using a Navbar component
import Footer from '../USER/Footer'; 

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // Holds the list of blogs
  const [loading, setLoading] = useState(true); // Handles loading state
  const [error, setError] = useState(null); // Handles error state
  const navigate = useNavigate(); // Initialize navigate

  // Fetch all blogs when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs') // Replace with your API URL
      .then(response => {
        setBlogs(response.data); // Set the blogs fetched from API
        setLoading(false); // Turn off loading
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs'); // Handle error if request fails
        setLoading(false); // Turn off loading
      });
  }, []);

  // Display a loading message if the blogs are still being fetched
  if (loading) return <p>Loading blogs...</p>;
  // Display an error message if there was a problem fetching the blogs
  if (error) return <p>{error}</p>;

  return (
    <div className="blogpage-container bg-[#F4E8DB] min-h-screen">
      <Navbar /> {/* Add the Navbar */}

      <div className="container mx-auto max-w-[1600px] px-4 py-16"> {/* Added top padding to create space */}
        <h1 className="text-4xl font-bold text-center text-[#915F57] mb-8" style={{ fontFamily: `'Lobster', cursive` }}>Our Latest Blog Posts</h1>

        {/* Display blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loop through the blogs and display them */}
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Blog Image */}
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />

              {/* Blog Title */}
              <h2 className="text-2xl font-semibold text-[#915F57] mb-2">{blog.title}</h2>

              {/* Blog Excerpt */}
              <p className="text-md text-gray-700 mb-4">{blog.excerpt}</p>

              {/* Read More Button */}
              <div className="mt-auto">
                <Link
                  to={`/blog/${blog._id}`}
                  className="bg-[#915F57] text-white px-4 py-2 rounded-md font-bold hover:bg-[#7B4C2E] transition-colors duration-300 inline-block text-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Submit a Blog Button */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-[#915F57] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#7B4C2E] transition-colors duration-300"
            onClick={() => navigate('/submit-blog')}
          >
            Submit a Blog
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
