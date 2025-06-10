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
