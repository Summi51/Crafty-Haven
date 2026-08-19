const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { ProductModel } = require("../model/productModel");
const { CraftyModel } = require("../model/craftyModel");
const { CraftBlogModel } = require("../model/craftBlogModel");

const mongoUrl = process.env.MONGO_URL || process.env.MongoDB_URL;
const dbPath = path.join(__dirname, "../../crafty-haven/db.json");

const upsertAll = async (Model, rows, label) => {
  for (const row of rows) {
    await Model.updateOne({ id: row.id }, { $set: row }, { upsert: true });
  }
  console.log(`Seeded ${rows.length} ${label}`);
};

const run = async () => {
  if (!mongoUrl) {
    throw new Error("MONGO_URL or MongoDB_URL is missing in .env");
  }
  const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  await mongoose.connect(mongoUrl);
  await upsertAll(ProductModel, data.products || [], "products");
  await upsertAll(CraftyModel, data.crafty || [], "crafty posts");
  await upsertAll(CraftBlogModel, data.craftblogs || [], "craft blogs");
  await mongoose.disconnect();
  console.log("Catalog seed complete.");
};

run().catch((error) => {
  console.error("Catalog seed failed:", error.message);
  process.exit(1);
});
