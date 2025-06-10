const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const proposals = []; // 🧠 In-memory proposal storage

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mount proposals route at /api/proposals

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

  if (riskLevel === "life-risk") {
    const proposal = {
      id: Date.now(),
      title: `[TIER 1] ${title}`,
      description,
      votes: 0,
      status: "pending",
      submittedAt: new Date(),
    };

    proposals.push(proposal); // Save to in-memory proposals
    console.log("🧠 Tier 1 Proposal added:", proposal);
  }

  res.status(200).json({ message: "Case submitted successfully." });
});

