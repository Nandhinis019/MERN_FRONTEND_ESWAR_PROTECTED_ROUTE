import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Upload, DollarSign, FileText, Image as ImageIcon } from 'lucide-react';

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports',
    'Beauty',
    'Toys',
    'Automotive'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/postProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          image: formData.image,
          category: formData.category,
          stock: Number(formData.stock)
        })
      });
      
      if (res.ok) {
        alert("Product Added Successfully!");
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
          stock: ''
        });
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/" className="text-orange-600 hover:text-orange-700 mr-4">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex items-center">
          <Package className="text-orange-500 mr-3" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="mr-2" />
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Package size={16} className="mr-2" />
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="mr-2" />
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Package size={16} className="mr-2" />
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                  errors.stock ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="mr-2" />
              Description *
            </label>
            <textarea
              name="description"
              placeholder="Enter detailed product description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <ImageIcon size={16} className="mr-2" />
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            
            {/* Image Preview */}
            {formData.image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Upload size={20} className="mr-2" />
              )}
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            
            <Link
              to="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
