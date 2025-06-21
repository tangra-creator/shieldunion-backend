const mongoose = require("mongoose");

const treasurySchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Treasury || mongoose.model("Treasury", treasurySchema);
