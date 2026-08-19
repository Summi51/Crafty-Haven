const mongoose = require("mongoose");

const craftBlogSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    img: { type: String, default: "" },
    desc: { type: String, default: "" },
    img1: { type: String, default: "" },
    blog: { type: String, default: "" },
  },
  { versionKey: false }
);

const CraftBlogModel = mongoose.model("craftblogs", craftBlogSchema);

module.exports = { CraftBlogModel };
