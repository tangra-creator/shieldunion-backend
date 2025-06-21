const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// ✅ Mongoose model import
const Proposal = require("../models/Proposal");
const ChatMessage = require("../models/ChatMessage"); // ✅ Add chat import for summaries

// 📁 Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 📎 File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}_${file.originalname}`;
    cb(null, unique);
  },
});
const upload = multer({ storage });

// ✅ Submit proposal
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProposal = new Proposal({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      urgency: req.body.urgency,
      file: filePath,
    });

    await newProposal.save();
    console.log("✅ DAO Proposal saved:", newProposal._id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to submit proposal:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all proposals (with optional chat log summary)
router.get("/", async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (err) {
    console.error("❌ Failed to load proposals:", err);
    res.status(500).json({ error: "Failed to load proposals" });
  }
});

// ✅ VOTE ON PROPOSAL
router.post("/vote", async (req, res) => {
  const { id, vote } = req.body;

  try {
    const proposal = await Proposal.findById(id);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    // Update vote count
    if (vote === "yes") proposal.votesYes += 1;
    if (vote === "no") proposal.votesNo += 1;

    await proposal.save();
    res.json({ success: true, proposal });
  } catch (err) {
    console.error("❌ Voting error:", err);
    res.status(500).json({ error: "Voting failed" });
  }
});

// ✅ Get full proposal by ID + related chat logs
router.get("/:id", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    let chatLogs = [];
    if (proposal.caseId) {
      chatLogs = await ChatMessage.find({ caseId: proposal.caseId }).sort({ timestamp: 1 });
    }

    res.json({ proposal, chatLogs });
  } catch (err) {
    console.error("❌ Proposal details fetch error:", err);
    res.status(500).json({ error: "Failed to fetch full proposal" });
  }
});

// 🔍 Auto-resolve expired proposals
router.post("/resolve", async (req, res) => {
  try {
    const all = await Proposal.find({ status: "voting" });

    let updatedCount = 0;

    for (let proposal of all) {
      const createdTime = new Date(proposal.createdAt).getTime();
      const durationMs = proposal.duration * 24 * 60 * 60 * 1000;

      if (Date.now() >= createdTime + durationMs) {
        if (proposal.votesYes > proposal.votesNo) {
          proposal.status = "approved";
        } else {
          proposal.status = "rejected";
        }
        await proposal.save();
        updatedCount++;
      }
    }

    res.json({ success: true, updated: updatedCount });
  } catch (err) {
    console.error("❌ Resolve error:", err);
    res.status(500).json({ error: "Failed to resolve proposals" });
  }
});

module.exports = router;
