const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', ProposalSchema);
