import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust the path as needed
import Footer from '../USER/Footer'; // Adjust the path as needed

const SubmitBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !excerpt || !content || !image) {
      setError('Please fill in all fields and upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/blog');
    } catch (error) {
      console.error('Error submitting blog:', error);
      setError('Error submitting the blog. Please try again.');
    }
  };

  return (
    <div className="submit-blog-page bg-[#F4E8DB] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto max-w-3xl p-6 bg-white rounded-lg shadow-lg mt-20 mb-20">
        <h1 className="text-3xl font-bold text-[#915F57] mb-6">Submit a Blog</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-[#915F57] text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-[#915F57]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="excerpt" className="block text-[#915F57] text-lg font-semibold mb-2">Excerpt</label>
            <input
              type="text"
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-[#915F57]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-[#915F57] text-lg font-semibold mb-2">Content</label>
            <textarea
              id="content"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-[#915F57]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-[#915F57] text-lg font-semibold mb-2">Upload an Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#915F57] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#7B4C2E] transition-colors duration-300"
            >
              Submit Blog
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SubmitBlog;
