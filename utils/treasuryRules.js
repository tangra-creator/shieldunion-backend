const mongoose = require('mongoose');
const Member = require('../models/Member');
const ProtectionCase = require('../models/ProtectionCase'); // Adjust if needed
const Treasury = require('../models/Treasury'); // Optional schema to track funds

// Settings
const MIN_MEMBERS = 2000;
const MAX_USAGE_PERCENTAGE = 33;

const isFinancialActionAllowed = async () => {
  const memberCount = await Member.countDocuments();
  if (memberCount < MIN_MEMBERS) {
    console.warn("⛔ Treasury blocked — not enough members to open financial cases.");
    return { allowed: false, reason: "Minimum 2000 members required before funding cases." };
  }

  const treasury = await Treasury.findOne({}); // If you track it
  const activeCases = await ProtectionCase.find({ status: "open", funded: true });

  const totalSpent = activeCases.reduce((sum, c) => sum + (c.allocatedAmount || 0), 0);
  const percentUsed = (totalSpent / treasury.totalFunds) * 100;

  if (percentUsed > MAX_USAGE_PERCENTAGE) {
    console.warn("⛔ Treasury usage exceeded 33%. Further cases temporarily blocked.");
    return { allowed: false, reason: "Treasury limit (33%) exceeded. Wait for resolution." };
  }

  return { allowed: true };
};

module.exports = { isFinancialActionAllowed };
