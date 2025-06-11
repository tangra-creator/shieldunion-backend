const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// 🧠 In-memory proposal store
let proposals = [];

// ✅ Register Route
app.post("/api/register", (req, res) => {
  const { fullName, email, password, incomeTier } = req.body;
console.log("REGISTER BODY:", req.body); // helpful debug line

  // TODO: Add validation
  return res.status(200).json({ message: "Registered successfully" });
});

// ✅ Submit Case Route
app.post("/api/register", (req, res) => {
  const { fullName, email, password, incomeTier } = req.body;

  // Validate inputs
  if (!fullName || !email || !password || !incomeTier) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Simulate DB storage or just log for now
  console.log("New registration received:", req.body);

  return res.status(201).json({ message: "Registration successful" });
});


// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
