const express = require("express");
const router = express.Router();

// Example: Get platform stats
router.get("/stats", async (req, res) => {
  try {
    // Add your real logic here later (e.g. Proposal.count, User.count, etc.)
    res.json({
      members: 132,
      proposals: 41,
      flags: 7,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to load admin stats" });
  }
});

module.exports = router;
