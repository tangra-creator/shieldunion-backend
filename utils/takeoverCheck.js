const mongoose = require('mongoose');
const Member = require('../models/Member');

// CONFIG
const START_DATE = new Date("2025-06-01"); // Confirmed platform start
const CHECK_DATE = new Date("2026-06-01"); // One year later
const MINIMUM_MEMBERS = 1000;

const checkFounderTakeover = async () => {
  const today = new Date();
  if (today < CHECK_DATE) {
    console.log("🕒 Takeover check not triggered yet.");
    return false;
  }

  try {
    const memberCount = await Member.countDocuments({});
    if (memberCount < MINIMUM_MEMBERS) {
      console.warn("🚨 ShieldUnion under 1000 members after 1 year. Founder regains full platform control.");
      return true; // Can be used to trigger control logic
    } else {
      console.log("✅ Member count OK. Takeover not triggered.");
      return false;
    }
  } catch (err) {
    console.error("❌ Failed to check member count:", err.message);
    return false;
  }
};

module.exports = { checkFounderTakeover };
