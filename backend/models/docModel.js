const mongoose = require("mongoose");

const docsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    default: "",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId, // Ensure this is of type ObjectId
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Docs", docsSchema);
