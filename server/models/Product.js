const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Please provide product price"],
    },
    photo_url: {
      type: String,
      required: true,
    },
    photo_path: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Breakfast", "Launch","Dinner"],
      default: 'Breakfast',
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;