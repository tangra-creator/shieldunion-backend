const express = require('express');
const router = express.Router();

// POST /api/proposals
router.post('/', (req, res) => {
  const { title, description, country } = req.body;

  if (!title || !description || !country) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  console.log('✅ Proposal received:');
  console.log('Title:', title);
  console.log('Description:', description);
  console.log('Country:', country);

  // In real use: Save to DB here

  res.status(200).json({ message: 'Proposal submitted successfully.' });
});

module.exports = router;
