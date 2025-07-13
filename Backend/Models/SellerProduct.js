const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    trim: true,
  },
  price: {
    type: String,
    required: [true, "Product price is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  images: {
    type: [String], // Array of Base64 strings or image URLs
    required: [true, "At least one image is required"],
    validate: [arrayLimit, "You must provide at least one image"],
  },
});

// Custom validator for images array
function arrayLimit(val) {
  return Array.isArray(val) && val.length > 0;
}

module.exports = mongoose.model("SellerProduct", Product);