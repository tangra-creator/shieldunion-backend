const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal"); // ✅ Make sure you have this model

// POST /api/civguard/flag
router.post("/flag", async (req, res) => {
  try {
    const { caseId, reason, severity } = req.body;

    // Auto-create DAO Proposal
    const newProposal = new Proposal({
      title: `🚩 Flagged Case: ${caseId}`,
      description: reason,
      urgency: "critical", // You can set based on severity if needed
      voteDuration: 3, // days
      evidence: "", // Optional or future file logic
    });

    await newProposal.save();

    return res.status(201).json({ message: "Flag submitted and DAO proposal created." });
  } catch (err) {
    console.error("Error creating DAO proposal from flag:", err);
    return res.status(500).json({ error: "Server error while flagging." });
  }
});

module.exports = router;
