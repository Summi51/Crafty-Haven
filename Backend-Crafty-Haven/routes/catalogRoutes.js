const express = require("express");
const { ProductModel } = require("../model/productModel");
const { CraftyModel } = require("../model/craftyModel");
const { CraftBlogModel } = require("../model/craftBlogModel");

const CatalogRouter = express.Router();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const findByNumericId = async (Model, id) => {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;
  return Model.findOne({ id: numericId }).lean();
};

CatalogRouter.get("/products", async (req, res) => {
  try {
    const page = toNumber(req.query._page || req.query.page, 1);
    const limit = toNumber(req.query._limit || req.query.limit, 20);
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.rating) {
      const ratings = String(req.query.rating)
        .split(",")
        .map(Number)
        .filter((value) => Number.isFinite(value));
      if (ratings.length) filter.rating = { $in: ratings };
    }

    const sort = {};
    const order = req.query._order === "desc" || req.query.order === "desc" ? -1 : 1;
    if (req.query._sort === "price" || req.query._order || req.query.order) sort.price = order;
    else sort.id = 1;

    const items = await ProductModel.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    return res.status(200).json(items);
  } catch (error) {
    console.error("Get products error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch products." });
  }
});

CatalogRouter.get("/products/:id", async (req, res) => {
  try {
    const product = await findByNumericId(ProductModel, req.params.id);
    if (!product) return res.status(404).json({ success: false, msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    console.error("Get product error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch product." });
  }
});

CatalogRouter.get("/crafty", async (_req, res) => {
  try {
    const items = await CraftyModel.find().sort({ id: 1 }).lean();
    return res.status(200).json(items);
  } catch (error) {
    console.error("Get crafty error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch crafty posts." });
  }
});

CatalogRouter.get("/crafty/:id", async (req, res) => {
  try {
    const item = await findByNumericId(CraftyModel, req.params.id);
    if (!item) return res.status(404).json({ success: false, msg: "Post not found" });
    return res.status(200).json(item);
  } catch (error) {
    console.error("Get crafty item error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch post." });
  }
});

CatalogRouter.get("/craftblogs", async (_req, res) => {
  try {
    const items = await CraftBlogModel.find().sort({ id: 1 }).lean();
    return res.status(200).json(items);
  } catch (error) {
    console.error("Get craftblogs error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch blogs." });
  }
});

CatalogRouter.get("/craftblogs/:id", async (req, res) => {
  try {
    const item = await findByNumericId(CraftBlogModel, req.params.id);
    if (!item) return res.status(404).json({ success: false, msg: "Blog not found" });
    return res.status(200).json(item);
  } catch (error) {
    console.error("Get craftblog error:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch blog." });
  }
});

module.exports = { CatalogRouter };
