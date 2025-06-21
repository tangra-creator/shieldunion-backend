// utils/chatThreatDetector.js

const threatKeywords = ['kill', 'corruption', 'danger', 'threat', 'assault', 'attack', 'life in danger'];

function scanMessageForThreat(message) {
  const lower = message.toLowerCase();
  return threatKeywords.some(keyword => lower.includes(keyword));
}

module.exports = {
  scanMessageForThreat,
};
