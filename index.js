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
    return res.status(400).json({ message: "Missing case title or description." });
  }

  // Example Tier 1 detection
  if (riskLevel === "life-risk") {
    console.log("🚨 Tier 1 case received — routing to DAO for immediate review");
    // TODO: Trigger DAO flag logic here
  }

  // TODO: Save case to database or memory (for now just echoing)
  console.log("📝 Case received:", { title, description, riskLevel });

  res.status(200).json({ message: "Case received successfully." });
});
