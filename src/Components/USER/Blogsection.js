import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust path as needed

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch blogs from the backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs'); // Replace with your API URL
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-page-container">
      {/* Import Navbar */}
      <Navbar />

      <section 
        className="blog-section py-12 bg-[#fedfda] relative"  // Updated background color
      >
        <div className="absolute inset-0 bg-white opacity-60"></div>
        <div className="container mx-auto max-w-[1200px] text-center space-y-6 relative z-10">
          <h2 className="text-5xl font-bold text-[#915F57]" style={{ fontFamily: `'Pacifico', cursive` }}>Discover Our Blog</h2>
          <p className="text-xl text-[#d99583]">
            Discover culinary delights in our blog – from baking inspiration to cooking news!
          </p>

          {/* Blog posts grid - displaying 3 blogs in view */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((post) => (
              <div key={post._id} className="bg-[#fefaf5] rounded-2xl shadow-lg border-4 border-[#d99583] overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img src={post.imageUrl} alt={post.title} className="h-40 w-full object-cover" />
                <div className="p-6">
                  <p className="text-sm text-[#915F57] font-medium">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-3xl font-semibold text-[#915F57] my-2" style={{ fontFamily: `'Lobster', cursive` }}>{post.title}</h3>
                  <p className="text-lg text-[#a67c68] mb-4" style={{ fontFamily: `'Quicksand', sans-serif` }}>{post.excerpt}</p>
                  <button
                    onClick={() => navigate(`/blog/${post._id}`)}
                    className="mt-4 bg-[#915F57] text-white py-2 px-4 rounded-full hover:bg-[#a67c68] transition-colors duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Button to navigate to Blog Page */}
          <button
            onClick={() => navigate('/blog')}
            className="mt-8 bg-gradient-to-r from-[#b87a4b] via-[#d1a48f] to-[#a0674b] text-white font-semibold px-8 py-3 rounded-full shadow-lg relative overflow-hidden group transition-transform duration-300 ease-out transform group-hover:-translate-y-1 group-hover:shadow-2xl animate-pulse hover:translate-y-[-0.25rem]"
            style={{ fontFamily: `'Lobster', cursive`, fontSize: '1.25rem' }}
          >
            {/* Inner Glow Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3c3d5] to-transparent opacity-80 rounded-full group-hover:animate-pulse transition-all duration-500"></span>

            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 ease-in-out">
              Explore More Blogs
            </span>

            {/* Border Animation */}
            <span className="absolute inset-0 rounded-full border-2 border-[#b87a4b] group-hover:border-[#915F57] transition-all duration-500 ease-in-out animate-border-glow"></span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
