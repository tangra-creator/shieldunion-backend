const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage'); // your Mongoose model
const { scanMessageForThreat } = require('../utils/chatThreatDetector');
const Proposal = require('../models/Proposal');

// Start chat session (optional)
router.post('/start', (req, res) => {
  res.status(200).json({ message: 'Smart chat session ready.' });
});

// Send message route
router.post('/send', async (req, res) => {
  try {
    const { caseId, sender, message } = req.body;

    if (!caseId || !sender || !message) {
      return res.status(400).json({ error: 'Missing fields.' });
    }

    // Save chat message
    const chat = new ChatMessage({ caseId, sender, message });
    await chat.save();

    // Threat detection
    const isThreat = scanMessageForThreat(message);
    if (isThreat) {
      // Create DAO proposal for threat
      const autoProposal = new Proposal({
        title: `🚨 Threat Detected in Case ${caseId}`,
        description: `Threat detected from ${sender}:\n\n${message}`,
        urgency: 'critical',
        duration: 2,
        caseId,
        autoFlagged: true,
        chatLog: [{ sender, message, timestamp: new Date() }],
      });
      await autoProposal.save();
    }

    res.status(201).json({ success: true, chat });
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get messages for a case
router.get('/:caseId', async (req, res) => {
  try {
    const { caseId } = req.params;
    const messages = await ChatMessage.find({ caseId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
