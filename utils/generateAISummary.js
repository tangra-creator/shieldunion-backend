// utils/generateAISummary.js
const axios = require("axios");

const generateAISummary = async (text) => {
  try {
    const res = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Summarize this DAO proposal clearly and briefly.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.5,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return res.data.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("AI summary error:", err.message);
    return null; // fallback if OpenAI fails
  }
};

module.exports = generateAISummary;
