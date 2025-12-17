const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "https://picsum.photos/500" },
  category: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  inStock: { type: Number, default: 0 },
  reviews: [reviewSchema]
});

module.exports = mongoose.model("Product", productSchema);
