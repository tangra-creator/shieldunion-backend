const express = require('express');
const router = express.Router();
require('dotenv').config();

// Founder login check
router.post('/auth', (req, res) => {
  const { code } = req.body;
  if (code === process.env.FOUNDER_CODE) {
    return res.json({ authorized: true });
  }
  return res.status(401).json({ authorized: false });
});

// Get founder platform stats
router.get('/stats', async (req, res) => {
  try {
    const Member = require('../models/Member');
    const Proposal = require('../models/Proposal');
    const Case = require('../models/VaultRecord');

    const members = await Member.countDocuments();
    const proposals = await Proposal.countDocuments();
    const cases = await Case.countDocuments();

    // Example fixed treasury balance (can be dynamic later)
    const treasury = (proposals * 0.02 + members * 0.01).toFixed(2); // ETH example

    res.json({ members, proposals, cases, treasury });
  } catch (err) {
    console.error("Founder stats error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
