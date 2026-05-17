const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/cover-letter", async (req, res) => {
  const { jobDescription, userProfile } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Write a professional cover letter for the following job:\n\nJob Description:\n${jobDescription}\n\nApplicant Profile:\n${userProfile}\n\nMake it concise, enthusiastic, and tailored to the job.`
        }
      ]
    })
  });

  const data = await response.json();
  const letter = data.content[0].text;
  res.json({ coverLetter: letter });
});

module.exports = router;