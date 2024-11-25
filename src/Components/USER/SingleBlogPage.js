import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // For getting the blog ID and navigation
import Navbar from '../Navbar'; // Import the Navbar component
import Footer from './Footer';

const SingleBlogPage = () => {
  const { id } = useParams(); // Get blog ID from the URL
  const navigate = useNavigate(); // Navigation for Go Back and Explore More
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`) // Replace with your actual API URL
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the blog post:', error);
        setError('Failed to load blog post');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-[#915F57] text-lg mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <div className="single-blog-page bg-[#F4E8DB] min-h-screen">
      <Navbar /> {/* Add Navbar */}
      
      <div className="container mx-auto max-w-[1200px] px-4 py-12">
        {/* Add space above the heading */}
        <div className="pt-20">
          {blog ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              {/* Blog Title */}
              <h1 className="text-5xl font-extrabold text-center text-[#5A3A21] mb-6">{blog.title}</h1>

              {/* Blog Image */}
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-lg mb-8 shadow-lg"
              />

              {/* Blog Content */}
              <div className="text-gray-800 text-lg leading-relaxed">
                <p className="mb-4">{blog.content}</p>
              </div>

              {/* Explore More and Go Back Buttons */}
              <div className="flex justify-between mt-8">
                {/* Go Back Button */}
                <button
                  className="bg-[#915F57] text-white py-2 px-4 rounded hover:bg-[#7B4C2E] transition duration-300"
                  onClick={() => navigate(-1)} // Goes back to the previous page
                >
                  Go Back
                </button>

                {/* Explore More Button */}
                <button
                  className="bg-[#915F57] text-white py-2 px-4 rounded hover:bg-[#7B4C2E] transition duration-300"
                  onClick={() => navigate('/blog')} // Navigate back to the blog listing
                >
                  Explore More Blogs
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-[#915F57] text-lg">Blog post not found.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SingleBlogPage;
