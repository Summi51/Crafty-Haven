const crypto = require("crypto");
const express = require("express");
const { OrderModel } = require("../model/orderModel");
const { CartModel } = require("../model/cartModel");
const { authMiddleware } = require("../middleware/authMiddleware");
const { razorpay, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("../config/razorpay");

const OrderRouter = express.Router();

const SHIPPING = {
  standard: { fee: 0, days: 7, label: "Standard (5-7 days)" },
  express: { fee: 99, days: 2, label: "Express (1-2 days)" },
};

const makeOrderId = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CH-${stamp}${random}`;
};

const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const ownOrder = async (orderId, userId) =>
  OrderModel.findOne({ orderId, userId });

const validateAddress = ({ name, phone, address, pincode }) => {
  if (!name || !phone || !address || !pincode) {
    return "Name, phone, address and pincode are required";
  }
  if (!/^[6-9]\d{9}$/.test(String(phone))) {
    return "Enter a valid 10-digit Indian phone number";
  }
  if (!/^\d{6}$/.test(String(pincode))) {
    return "Pincode must be 6 digits";
  }
  return null;
};

const loadCheckoutCart = async (userId, shippingMethod) => {
  const method = shippingMethod === "express" ? "express" : "standard";
  const cart = await CartModel.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return { error: "Your cart is empty" };
  }
  const itemsTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = SHIPPING[method].fee;
  return {
    cart,
    method,
    itemsTotal,
    shippingFee,
    total: itemsTotal + shippingFee,
  };
};

const verifyRazorpaySignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
  return expected === razorpaySignature;
};

// POST /api/orders/create-payment  -> Razorpay order only, shop order is not saved yet
OrderRouter.post("/create-payment", authMiddleware, async (req, res) => {
  try {
    const addressError = validateAddress(req.body);
    if (addressError) return res.status(400).json({ success: false, msg: addressError });

    const checkout = await loadCheckoutCart(req.user.id, req.body.shippingMethod);
    if (checkout.error) return res.status(400).json({ success: false, msg: checkout.error });

    const amountInPaise = Math.round(checkout.total * 100);
    if (amountInPaise < 100) {
      return res.status(400).json({ success: false, msg: "Order amount must be at least ₹1" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `ch_${Date.now()}`,
      notes: {
        userId: String(req.user.id),
        email: req.user.email || "",
        shippingMethod: checkout.method,
      },
    });

    return res.status(200).json({
      success: true,
      keyId: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      razorpayOrderId: razorpayOrder.id,
      total: checkout.total,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);
    return res.status(500).json({ success: false, msg: "Failed to start payment." });
  }
});

// POST /api/orders  -> verify Razorpay payment, then place the shop order
OrderRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      pincode,
      shippingMethod,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const addressError = validateAddress({ name, phone, address, pincode });
    if (addressError) return res.status(400).json({ success: false, msg: addressError });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, msg: "Complete Razorpay payment before placing the order" });
    }
    if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return res.status(400).json({ success: false, msg: "Payment verification failed" });
    }

    const checkout = await loadCheckoutCart(req.user.id, shippingMethod);
    if (checkout.error) return res.status(400).json({ success: false, msg: checkout.error });

    const alreadyPaid = await OrderModel.findOne({ razorpayPaymentId: razorpay_payment_id });
    if (alreadyPaid) {
      return res.status(200).json({ success: true, msg: "Order already placed", order: alreadyPaid });
    }

    const { cart, method, itemsTotal, shippingFee, total } = checkout;
    const order = await OrderModel.create({
      orderId: makeOrderId(),
      userId: req.user.id,
      email: req.user.email,
      items: cart.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "Free Size",
      })),
      shippingAddress: { name: name.trim(), phone: String(phone), address: address.trim(), pincode: String(pincode) },
      shippingMethod: method,
      shippingFee,
      itemsTotal,
      total,
      estimatedDelivery: addDays(SHIPPING[method].days),
      paymentStatus: "paid",
      paymentMethod: "razorpay",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "placed",
      timeline: [{ status: "placed", note: "Paid with Razorpay and order placed." }],
    });

    cart.items = [];
    await cart.save();
    return res.status(201).json({ success: true, msg: "Payment successful. Order placed", order });
  } catch (error) {
    console.error("Place order error:", error);
    return res.status(500).json({ success: false, msg: "Failed to place order." });
  }
});

// GET /api/orders  -> only this user's orders
OrderRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("List orders error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch orders." });
  }
});

// GET /api/orders/:orderId  -> one order, only if it belongs to this user
OrderRouter.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await ownOrder(req.params.orderId, req.user.id);
    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Get order error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch order." });
  }
});

// PATCH /api/orders/:orderId/cancel
OrderRouter.patch("/:orderId/cancel", authMiddleware, async (req, res) => {
  try {
    const order = await ownOrder(req.params.orderId, req.user.id);
    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });
    if (["cancelled", "delivered"].includes(order.status)) {
      return res.status(400).json({ success: false, msg: `Order already ${order.status}` });
    }
    if (["shipped", "out_for_delivery"].includes(order.status)) {
      return res.status(400).json({ success: false, msg: "Order is already on the way. Cancel is not allowed." });
    }
    order.status = "cancelled";
    order.cancelReason = req.body.reason || "Cancelled by customer";
    order.timeline.push({ status: "cancelled", note: order.cancelReason });
    await order.save();
    return res.status(200).json({ success: true, msg: "Order cancelled", order });
  } catch (error) {
    console.error("Cancel order error:", error);
    return res.status(500).json({ success: false, msg: "Failed to cancel order." });
  }
});

// PATCH /api/orders/:orderId/refund
OrderRouter.patch("/:orderId/refund", authMiddleware, async (req, res) => {
  try {
    const order = await ownOrder(req.params.orderId, req.user.id);
    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });
    if (order.status !== "cancelled" && order.status !== "delivered") {
      return res.status(400).json({ success: false, msg: "Refund is available after cancel or delivery." });
    }
    if (order.paymentStatus === "refunded") {
      return res.status(400).json({ success: false, msg: "Refund already completed" });
    }
    if (order.paymentStatus !== "paid") {
      return res.status(400).json({ success: false, msg: "Refund is available only for paid orders." });
    }
    order.paymentStatus = "refund_requested";
    order.timeline.push({
      status: "refund_requested",
      note: req.body.reason || "Refund requested for Razorpay payment.",
    });
    await order.save();
    return res.status(200).json({ success: true, msg: "Refund requested", order });
  } catch (error) {
    console.error("Refund order error:", error);
    return res.status(500).json({ success: false, msg: "Failed to request refund." });
  }
});

module.exports = { OrderRouter };
