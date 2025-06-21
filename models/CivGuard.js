const mongoose = require("mongoose");

const CivGuardSchema = new mongoose.Schema({
  alias: String,
  type: String,
  groupSize: Number,
  serviceLevel: String,
  paid: Number,
  document: { type: String }, // optional
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "verified", "rejected", "flagged"]
  }
});

module.exports = mongoose.model("CivGuard", CivGuardSchema);
