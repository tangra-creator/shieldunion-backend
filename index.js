const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); app.use(express.json()); // ✅ Required to parse JSON body from frontend

app.use(express.json()); // ✅ This is required to parse JSON from frontend

const PORT = process.env.PORT || 5000;

// Base route
app.get('/', (req, res) => {
  res.send('Shieldunion backend server is running.');
});

// POST route for case submission
app.post('/submit-case', (req, res) => {
  const caseData = req.body;
  console.log('✅ Case received from frontend:', caseData);
  res.json({ success: true, message: 'Case submitted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
