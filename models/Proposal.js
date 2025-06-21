const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, default: 3 }, // in days
  urgency: { type: String, enum: ["normal", "urgent", "critical"], default: "normal" },
  file: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected", "voting"], default: "pending" },
  votesYes: { type: Number, default: 0 },
  votesNo: { type: Number, default: 0 },
  caseId: { type: String },
  autoFlagged: { type: Boolean, default: false },
  chatLog: [
    {
      sender: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Proposal", ProposalSchema);
