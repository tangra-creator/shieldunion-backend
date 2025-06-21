const mongoose = require("mongoose");

const VaultRecordSchema = new mongoose.Schema({
  title: String,
  content: String,
  urgency: { type: String, enum: ["normal", "critical"], default: "normal" },
  status: { type: String, enum: ["public", "classified"], default: "classified" },
  authorizedWallets: [String], // Wallets allowed to access
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VaultRecord", VaultRecordSchema);
