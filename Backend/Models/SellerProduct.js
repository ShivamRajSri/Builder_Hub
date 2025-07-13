const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true }, // store image URL or base64
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);