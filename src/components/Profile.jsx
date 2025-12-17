import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Users, MapPin, Phone, Edit2, Save, X } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        age: parsedUser.age || '',
        gender: parsedUser.gender || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      age: user.age || '',
      gender: user.gender || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-400 to-red-500 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User size={40} className="text-orange-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name || 'User'}</h1>
                <p className="text-orange-100">ZOVAi.in Member</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center"
            >
              {isEditing ? <X size={16} className="mr-1" /> : <Edit2 size={16} className="mr-1" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="flex items-center space-x-3">
                <User size={20} className="text-gray-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <p className="text-gray-900">{user.name || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <p className="text-gray-900">{user.email || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar size={20} className="text-gray-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <p className="text-gray-900">{user.age || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users size={20} className="text-gray-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{user.gender || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  ) : (
                    <p className="text-gray-900">{user.address || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Account Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member since:</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wishlist Items:</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Save size={16} className="mr-1" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}