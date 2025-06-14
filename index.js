const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

let registrations = []; // Temporary in-memory store

app.use(cors());
app.use(bodyParser.json());

// POST route for registration
app.post("/register", (req, res) => {
  const data = req.body;
  registrations.push(data);
  res.status(200).json({ message: "Registration received", data });
});

// GET route to return all registrations
app.get("/registrations", (req, res) => {
  res.status(200).json(registrations);
});

app.get("/", (req, res) => {
  res.send("ShieldUnion backend server is running.");
});
// 🔐 Mock Proposals Data
let proposals = [
  {
    id: "p1",
    title: "Grant Emergency Aid to Member #2025-A31",
    description: "Member A31 reports urgent danger and requests 72-hour support fund.",
    status: "open",
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "p2",
    title: "Blacklist corrupt CivGuard #882",
    description: "Evidence submitted for misconduct. DAO vote required.",
    status: "open",
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
  }
];

// 🔍 GET: List Proposals
app.get("/api/proposals", (req, res) => {
  res.json(proposals);
});

// 🗳️ POST: Submit Vote
app.post("/api/proposals/vote", (req, res) => {
  const { proposalId, vote } = req.body;
  console.log(`✅ Vote received: ${vote.toUpperCase()} on proposal ${proposalId}`);
  res.json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

