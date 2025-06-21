require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const OpenAI = require("openai"); // ✅ NEW: CommonJS-compatible OpenAI import

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shieldunion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Route imports
const memberRoutes = require('./routes/member');
const civguardRoutes = require('./routes/civguard');
const proposalRoutes = require('./routes/proposals');
const protectionRoutes = require('./routes/protection');

app.use('/api/member', memberRoutes);
app.use('/api/civguard', civguardRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/protection', protectionRoutes);

// ✅ OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ In-memory chat store (temporary)
const messages = {}; // { caseId: [ { sender, message, time } ] }

// ✅ POST /api/chat/:caseId — save + reply
app.post('/api/chat/:caseId', async (req, res) => {
  const { caseId } = req.params;
  const { sender, message } = req.body;

  if (!caseId || !sender || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!messages[caseId]) messages[caseId] = [];
  messages[caseId].push({ sender, message, time: Date.now() });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiReply = {
      sender: "SmartAI",
      message: completion.choices[0].message.content,
      time: Date.now() + 1000
    };

    messages[caseId].push(aiReply);
    return res.json({ success: true, ai: aiReply });
  } catch (err) {
    console.error("❌ OpenAI Error:", err.message);
    return res.status(500).json({ error: "AI reply failed" });
  }
});

// ✅ GET /api/chat/:caseId — fetch messages
app.get('/api/chat/:caseId', (req, res) => {
  const { caseId } = req.params;
  return res.json(messages[caseId] || []);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
