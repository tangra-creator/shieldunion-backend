const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const proposalRoutes = require('./routes/proposals');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mount proposals route at /api/proposals
app.use('/api/proposals', proposalRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  // TODO: Validate + Save user
  return res.status(200).json({ message: "Registered successfully" });
});
app.post("/api/case", (req, res) => {
  const { title, description, riskLevel } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Missing title or description." });
  }

  // ✅ Tier 1 Detection
  if (riskLevel === "life-risk") {
    console.log("🚨 Tier 1 case received — auto-routing to DAO...");

    // ⛓️ TODO: Trigger DAO logic here
    // For now, simulate it:
    const proposal = {
      id: Date.now(),
      title: `[TIER 1] ${title}`,
      description,
      votes: 0,
      status: "pending",
      submittedAt: new Date(),
    };

    // Store to memory or forward to DAO list (you can later store to DB)
    console.log("🗳️ Auto-generated DAO Proposal:", proposal);
  }

  // Respond
  res.status(200).json({ message: "Case submitted successfully." });
});

