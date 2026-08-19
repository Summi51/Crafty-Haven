const mongoose = require("mongoose");

const craftySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    img: { type: String, default: "" },
    desc: { type: String, required: true },
    blog: { type: String, default: "" },
  },
  { versionKey: false }
);

const CraftyModel = mongoose.model("crafty", craftySchema);

module.exports = { CraftyModel };
