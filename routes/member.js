const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Member schema
const MemberSchema = new mongoose.Schema({
  alias: { type: String, required: true },
  wallet: { type: String, required: true },
  incomeTier: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  promoFree: { type: Boolean, default: false }, // indicates if member joined during free promo period
});

const Member = mongoose.model('Member', MemberSchema);

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { alias, wallet, incomeTier } = req.body;

    if (!alias || !wallet || !incomeTier) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Count current registered members
    const memberCount = await Member.countDocuments();

    // If fewer than 1500 members, register with promoFree = true and no fees apply
    const isPromoFree = memberCount < 1500;

    const newMember = new Member({
      alias,
      wallet,
      incomeTier,
      promoFree: isPromoFree,
    });

    await newMember.save();

    // Return message with promotion status
    res.status(200).json({
      message: 'Registered successfully',
      promoFree: isPromoFree,
      promoMessage: isPromoFree
        ? 'You are among the first 1500 members and have joined for free during the promotion!'
        : 'Standard membership fees apply.',
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
