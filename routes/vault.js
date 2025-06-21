const express = require("express");
const router = express.Router();

// Temporary: Valid access codes and mocked data
const VALID_CODES = ["TRUSTED123", "CIVGUARD2025", "DAOACCESSX"];
const MOCK_ITEMS = [
  {
    title: "Whistleblower Evidence – Tax Scheme",
    content: "Confidential report submitted by protected member #894.",
    fileUrl: "/uploads/classified-tax.pdf",
    createdAt: new Date(),
    urgency: "critical",
  },
  {
    title: "Corruption Files – Municipality A",
    content: "Internal emails and meeting logs submitted by informant.",
    fileUrl: "/uploads/classified-corruption.pdf",
    createdAt: new Date(Date.now() - 86400000),
    urgency: "normal",
  },
];

// Route: POST /api/vault/access
router.post("/access", (req, res) => {
  const { code } = req.body;

  if (!code || !VALID_CODES.includes(code)) {
    return res.status(403).json({ error: "Invalid code" });
  }

  return res.json({ items: MOCK_ITEMS });
});

module.exports = router;
