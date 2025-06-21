const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  income: { type: Number, required: true },
  groupSize: { type: Number, default: 1 },
  documents: { type: String }, // Path to uploaded income document
  idDocument: { type: String }, // Path to uploaded ID
  walletAddress: { type: String },
  paymentHash: { type: String },
  type: { type: String, enum: ['member', 'civguard'], default: 'member' },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Prevent model overwrite on recompile (fixes OverwriteModelError)
module.exports = mongoose.models.Member || mongoose.model('Member', memberSchema);
