const mongoose = require("mongoose");

// One line inside a user's cart
const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    size: { type: String, default: "" },
  },
  { _id: false }
);

// One cart document per logged-in user
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { versionKey: false, timestamps: true }
);

const CartModel = mongoose.model("carts", cartSchema);

module.exports = { CartModel };
