import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import { FaFilter } from 'react-icons/fa'; // Import filter icon

const Productsupload = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [productsPerPage] = useState(7); // Updated to display 8 products per page
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
  const [currentProduct, setCurrentProduct] = useState(null); // Hold the product for editing
  const [uploadMessage, setUploadMessage] = useState(''); // Success message state

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Pending');
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default is "All"
  const categories = ['All', 'Croissant', 'Cupcake', 'cakes', 'Buns', 'bread'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initially filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle filtering by category
  const handleFilter = () => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products); // Show all products if "All" is selected
    } else {
      setFilteredProducts(products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase()));
    }
    setCurrentPage(1); // Reset pagination to page 1 after filtering
  };

  // Submit a new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !stock || !category || !image) {
      console.error('All fields, including the image, are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('status', status);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts([response.data.product, ...products]); // Update product list
      setFilteredProducts([response.data.product, ...products]); // Update filtered list
      resetForm();
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };


  // Handle edit submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updatedProducts = products.map((prod) =>
        prod._id === response.data.product._id ? response.data.product : prod
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts); // Update filtered list too
      setShowEditModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setCategory('');
    setImage(null);
    setStatus('Pending');
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setCategory(product.category);
    setStatus(product.status);
    setShowEditModal(true);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Toggle specialty status with immediate state update
  const toggleSpecialty = async (productID) => {
    try {
      const updatedProducts = products.map((product) =>
        product._id === productID ? { ...product, isSpecialty: !product.isSpecialty } : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts); // Update filtered list

      await axios.put(`http://localhost:5000/api/products/${productID}/specialty`);
    } catch (error) {
      console.error('Error toggling specialty:', error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-[#FFF5EB] min-h-screen">
        <h1 className="text-4xl font-bold text-[#915F57] mb-6">Product Management</h1>
        {/* Success Message */}
        {uploadMessage && (
          <div className="mb-4 p-4 bg-green-200 text-green-800 rounded-md text-center shadow-lg">
            <strong>🎉 Success!</strong> Your product has been added to the catalog successfully.
            Thank you for keeping our inventory up-to-date!
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          {/* Add New Product button aligned to the left */}
          <button
            className="btn bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition duration-300"
            onClick={() => setShowUploadModal(true)}
          >
            + Add New Product
          </button>

          {/* Dropdown and Filter button aligned to the right */}
          <div className="flex items-center space-x-2">
            <select
              className="form-control w-56 bg-white border border-[#915F57] text-[#915F57] rounded-md p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              className="btn bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition duration-300"
              onClick={handleFilter}
            >
              <FaFilter className="inline-block mr-2" /> Filter
            </button>
          </div>
        </div>


        {/* Styled Table */}
        <table className="min-w-full bg-white rounded-md shadow-md mb-4 table-auto border-collapse border border-[#915F57]">
          <thead className="bg-[#F4E8DB]">
            <tr>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Product Name</th>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Category</th>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Price</th>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Stock</th>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Image</th>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Status</th>
              <th className="px-4 py-2 border border-[#915F57] text-left text-[#915F57]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2 text-[#915F57]">{product.name}</td>
                <td className="border px-4 py-2 text-[#915F57]">{product.category}</td>
                <td className="border px-4 py-2 text-[#915F57]">${product.price}</td>
                <td className="border px-4 py-2 text-[#915F57]">{product.stock}</td>
                <td className="border px-4 py-2">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="border px-4 py-2 text-[#915F57]">
                  <span
                    className={`${product.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                      } text-white px-2 py-1 rounded-md`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    className="btn bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition-all duration-300"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-white ${product.isSpecialty ? 'bg-indigo-500' : 'bg-blue-500' // Changed colors to indigo and blue
                      } hover:opacity-90 transition-all duration-300`}
                    onClick={() => toggleSpecialty(product._id)}
                  >
                    {product.isSpecialty ? 'Remove Specialty' : 'Add Specialty'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <button
            className="btn bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition duration-300"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-[#915F57]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition duration-300"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Modal for uploading new product */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-1/2">
              <h2 className="text-2xl mb-4">Upload Product</h2>
              <form onSubmit={handleSubmit}>
                {/* Fields for name, description, price, etc. */}
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                  <select
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300"
                    onClick={() => {
                      setShowUploadModal(false);
                      resetForm(); // Reset the form when the modal is closed
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-[#915F57] text-white px-4 py-2 rounded-md hover:bg-[#7B4C2E] transition-all duration-300"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Modal for editing product */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-1/2">
              <h2 className="text-2xl mb-4">Edit Product</h2>
              <form onSubmit={handleEditSubmit}>
                {/* Fields for name, description, price, etc. */}
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                  <select
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    className="form-control bg-[#FFF5EB] border border-[#915F57] rounded-md p-2"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <button
                  type="submit"
                  className="btn bg-[#915F57] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#7B4C2E] transition-all duration-300"
                >
                  Update Product
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productsupload;
