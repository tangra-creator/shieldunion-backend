const express = require('express');
const router = express.Router();

// POST /api/proposals
router.post('/', (req, res) => {
  const { title, description, country } = req.body;

  // Validate required fields
  if (!title || !description || !country) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Simulate storing the proposal (e.g., database save could go here)
  console.log('✅ Proposal received:', { title, description, country });

  // Respond success
  return res.status(200).json({ message: 'Proposal submitted successfully' });
});

module.exports = router;
