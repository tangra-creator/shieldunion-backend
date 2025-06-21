const mongoose = require("mongoose");

const ProtectionCaseSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "low",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "in-progress"],
    default: "pending",
  },
  evidence: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.ProtectionCase ||
  mongoose.model("ProtectionCase", ProtectionCaseSchema);
