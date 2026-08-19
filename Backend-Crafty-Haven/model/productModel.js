const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    img: { type: String, default: "" },
    desc: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0 },
    category: { type: String, default: "" },
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("products", productSchema);

module.exports = { ProductModel };
