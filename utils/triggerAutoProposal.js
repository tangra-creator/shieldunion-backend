// utils/triggerAutoProposal.js

const Proposal = require("../models/Proposal");

const triggerAutoProposal = async ({ caseId, sender, message }) => {
  // 🛑 Define simple keyword detection logic
  const threatKeywords = ["death", "killed", "corruption", "murder", "threat", "bribe", "violence"];

  const lowerMessage = message.toLowerCase();

  const found = threatKeywords.some((word) => lowerMessage.includes(word));

  if (found) {
    // 🚨 Auto-submit DAO proposal
    const newProposal = new Proposal({
      title: `⚠️ Auto-Flagged: Review Case ${caseId}`,
      description: `Auto-submitted due to high-risk message from ${sender}:\n\n"${message}"`,
      urgency: "critical",
      duration: 1, // Shorter voting period for flagged threats
      caseId,
      autoFlagged: true,
      status: "voting",
    });

    await newProposal.save();
    console.log("🚨 Auto-proposal submitted to DAO for review.");
    return true;
  }

  return false;
};

module.exports = triggerAutoProposal;
