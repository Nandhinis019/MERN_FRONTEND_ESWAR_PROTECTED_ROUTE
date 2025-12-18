import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, Image, FileText, Tag, Percent, Box } from 'lucide-react';

export default function Addproducts() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: 'electronics',
    inStock: '',
    rating: 4,
    reviewCount: 0
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'books', label: 'Books' },
    { value: 'sports', label: 'Sports' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Auto-calculate discount if price and originalPrice are provided
    if (name === 'price' || name === 'originalPrice') {
      const price = name === 'price' ? parseFloat(value) : parseFloat(formData.price);
      const originalPrice = name === 'originalPrice' ? parseFloat(value) : parseFloat(formData.originalPrice);
      
      if (price && originalPrice && originalPrice > price) {
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        setFormData(prev => ({
          ...prev,
          [name]: value,
          discount: discount.toString()
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.inStock) newErrors.inStock = 'Stock quantity is required';
    else if (parseInt(formData.inStock) < 0) newErrors.inStock = 'Stock cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create product object
      const newProduct = {
        _id: `${formData.category.substring(0, 4)}_${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
        discount: formData.discount ? parseInt(formData.discount) : 0,
        image: formData.image,
        category: formData.category,
        inStock: parseInt(formData.inStock),
        rating: parseInt(formData.rating),
        reviewCount: parseInt(formData.reviewCount)
      };

      // Get existing products from localStorage
      const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('customProducts', JSON.stringify(existingProducts));

      alert('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        discount: '',
        image: '',
        category: 'electronics',
        inStock: '',
        rating: 4,
        reviewCount: 0
      });

      // Navigate to products page
      setTimeout(() => {
        navigate('/products');
      }, 1000);

    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details to add a new product to your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package size={16} className="inline mr-1" />
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-1" />
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag size={16} className="inline mr-1" />
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Price and Original Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Selling Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter selling price"
                min="0"
                step="0.01"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter original price (optional)"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">For showing discount</p>
            </div>
          </div>

          {/* Discount and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Percent size={16} className="inline mr-1" />
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Auto-calculated or enter manually"
                min="0"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-calculated from prices</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Box size={16} className="inline mr-1" />
                Stock Quantity *
              </label>
              <input
                type="number"
                name="inStock"
                value={formData.inStock}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errors.inStock ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter stock quantity"
                min="0"
              />
              {errors.inStock && <p className="text-red-500 text-sm mt-1">{errors.inStock}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Image size={16} className="inline mr-1" />
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            <p className="text-xs text-gray-500 mt-1">Use Unsplash or any image hosting service</p>
            
            {/* Image Preview */}
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
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

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Rating (1-5)
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Helper Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for Adding Products:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use high-quality images (recommended: 400x400px or larger)</li>
            <li>• Write clear, detailed descriptions</li>
            <li>• Set competitive prices</li>
            <li>• Keep stock quantities updated</li>
            <li>• Use Unsplash.com for free product images</li>
          </ul>
        </div>
      </div>
    </div>
  );
}