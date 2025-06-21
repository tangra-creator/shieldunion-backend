const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const { scanMessageForThreat } = require('../utils/chatThreatDetector');
const Proposal = require('../models/Proposal');

// ➕ Start Chat Session (optional endpoint)
router.post('/start', (req, res) => {
  res.status(200).json({ message: 'Smart chat session ready.' });
});

// 💬 Send a message
router.post('/send', async (req, res) => {
  try {
    const { caseId, sender, message } = req.body;

    if (!caseId || !sender || !message) {
      return res.status(400).json({ error: 'Missing fields.' });
    }

    // Save chat to messages DB
    const chat = new ChatMessage({ caseId, sender, message });
    await chat.save();

    // 🧠 Check if message contains threat
    const isThreat = scanMessageForThreat(message);
    if (isThreat) {
      console.log(`🚨 Threat detected in message: "${message}"`);

      // Create DAO proposal with chat log
      const autoProposal = new Proposal({
        title: `🚨 Threat Detected in Case ${caseId}`,
        description: `A potentially dangerous message was sent by ${sender} in case ${caseId}:\n\n"${message}"`,
        urgency: 'critical',
        duration: 2,
        caseId,
        autoFlagged: true,
        chatLog: [
          {
            sender,
            message,
            timestamp: new Date()
          }
        ],
      });

      await autoProposal.save();
      console.log(`✅ DAO proposal auto-submitted for Case ${caseId}`);
    }

    res.status(201).json({ success: true, chat });

  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// 📥 Get all messages for a case
router.get('/:caseId', async (req, res) => {
  try {
    const { caseId } = req.params;
    const messages = await ChatMessage.find({ caseId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Get chat error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
