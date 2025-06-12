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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
