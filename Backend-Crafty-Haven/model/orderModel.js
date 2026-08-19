const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, default: "Free Size" },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const timelineSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    note: { type: String, default: "" },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    email: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    shippingAddress: { type: addressSchema, required: true },
    shippingMethod: { type: String, enum: ["standard", "express"], required: true },
    shippingFee: { type: Number, required: true, min: 0 },
    itemsTotal: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    estimatedDelivery: { type: Date },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refund_requested", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "razorpay" },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
    timeline: { type: [timelineSchema], default: [] },
    cancelReason: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = { OrderModel };
