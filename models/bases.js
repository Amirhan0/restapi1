const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newBase = new Schema({
  name: String,
  position: String,
  completed: { type: Boolean, default: false },
});

const Base = mongoose.model("bases", newBase);

module.exports = Base;
