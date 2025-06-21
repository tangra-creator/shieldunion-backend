const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
  },
  sender: {
    type: String, // 'member' or 'civguard'
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
