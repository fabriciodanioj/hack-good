const mongoose = require("mongoose");
const PointSchema = require('./utils/PointSchema');

const ActionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Action", ActionSchema);
