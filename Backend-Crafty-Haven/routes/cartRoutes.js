const express = require("express");
const { CartModel } = require("../model/cartModel");
const { authMiddleware } = require("../middleware/authMiddleware");

const CartRouter = express.Router();

const getOrCreateCart = async (userId) => {
  let cart = await CartModel.findOne({ userId });
  if (!cart) cart = await CartModel.create({ userId, items: [] });
  return cart;
};

// Same product = one line. Old S/M/L rows get merged into Free Size.
const collapseItems = (items) => {
  const merged = [];
  items.forEach((item) => {
    const existing = merged.find((entry) => entry.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.size = "Free Size";
    } else {
      merged.push({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: "Free Size",
      });
    }
  });
  return merged;
};

// GET /api/cart  -> only this user's cart
CartRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    const items = collapseItems(cart.items);
    if (items.length !== cart.items.length || cart.items.some((item) => item.size !== "Free Size")) {
      cart.items = items;
      await cart.save();
    }
    return res.status(200).json({ success: true, items: cart.items });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch cart." });
  }
});

// POST /api/cart  -> add item (same product increases qty)
CartRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, title, image, price, quantity } = req.body;
    if (!productId || !title || price === undefined) {
      return res.status(400).json({
        success: false,
        msg: "productId, title and price are required",
      });
    }

    const qty = Number(quantity) > 0 ? Number(quantity) : 1;
    const cart = await getOrCreateCart(req.user.id);
    cart.items = collapseItems(cart.items);
    const existing = cart.items.find((item) => item.productId === String(productId));

    if (existing) {
      existing.quantity += qty;
      existing.size = "Free Size";
    } else {
      cart.items.push({
        productId: String(productId),
        title,
        image: image || "",
        price: Number(price),
        quantity: qty,
        size: "Free Size",
      });
    }

    await cart.save();
    return res.status(200).json({ success: true, msg: "Item added to cart", items: cart.items });
  } catch (error) {
    console.error("Add cart error:", error);
    return res.status(500).json({ success: false, msg: "Failed to add item." });
  }
});

// PATCH /api/cart/:productId  -> set quantity (0 removes)
CartRouter.patch("/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const quantity = Number(req.body.quantity);
    if (!Number.isFinite(quantity) || quantity < 0) {
      return res.status(400).json({ success: false, msg: "quantity must be 0 or more" });
    }

    const cart = await getOrCreateCart(req.user.id);
    cart.items = collapseItems(cart.items);
    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
    } else {
      const item = cart.items.find((entry) => entry.productId === productId);
      if (!item) return res.status(404).json({ success: false, msg: "Item not found in cart" });
      item.quantity = quantity;
      item.size = "Free Size";
    }

    await cart.save();
    return res.status(200).json({ success: true, items: cart.items });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ success: false, msg: "Failed to update cart." });
  }
});

// DELETE /api/cart/:productId  -> remove one item
CartRouter.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = collapseItems(cart.items).filter((item) => item.productId !== req.params.productId);
    await cart.save();
    return res.status(200).json({ success: true, msg: "Item removed", items: cart.items });
  } catch (error) {
    console.error("Delete cart item error:", error);
    return res.status(500).json({ success: false, msg: "Failed to remove item." });
  }
});

module.exports = { CartRouter };
