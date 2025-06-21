const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { isFinancialActionAllowed } = require("../utils/treasuryRules");

// POST /api/protection/request
router.post("/request", upload.none(), async (req, res) => {
  const { reason, evidence } = req.body;

  if (!reason || reason.trim() === "") {
    return res.status(400).json({ error: "Protection reason is required." });
  }

  // Check treasury + member rules
  const treasuryCheck = await isFinancialActionAllowed();
  if (!treasuryCheck.allowed) {
    return res.status(403).json({ error: treasuryCheck.reason });
  }

  // Evidence check placeholder
  if (!evidence || evidence.length < 10) {
    return res.status(400).json({ error: "Valid evidence must be uploaded." });
  }

  // Smart Engine & DAO approval simulation (to be replaced with real checks)
  const aiApproved = true; // Placeholder for AI smart engine logic
  const daoApproved = true; // Placeholder for DAO vote result

  if (!aiApproved || !daoApproved) {
    return res.status(403).json({ error: "Case rejected: not approved by Smart Engine or DAO." });
  }

  console.log("🛡️ New protection request accepted:", reason);
  res.status(200).json({ message: "Protection request submitted and accepted for processing." });
});

// ✅ Public Vault - DAO-approved summaries
router.get("/public", (req, res) => {
  const publicRecords = [
    {
      caseId: "DAO-1001",
      summary: "Whistleblower report on corruption in local elections.",
      riskLevel: "High",
      approvedAt: new Date(),
    },
    {
      caseId: "DAO-1002",
      summary: "Suppressed case regarding journalist harassment.",
      riskLevel: "Medium",
      approvedAt: new Date(),
    },
  ];

  res.json(publicRecords);
});

// ✅ Member active protection overview
router.get("/active", (req, res) => {
  const activeProtections = [
    {
      guardName: "CivGuard Ava",
      caseId: "CASE-2091",
      status: "Monitoring & evidence gathering",
      updatedAt: new Date(),
    },
    {
      guardName: "CivGuard Theo",
      caseId: "CASE-1944",
      status: "Filed for legal injunction",
      updatedAt: new Date(),
    },
  ];

  res.json(activeProtections);
});

module.exports = router;
