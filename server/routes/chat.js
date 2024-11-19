const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
require("dotenv").config();

const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


router.post("/chat-with-bot", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ success: false, message: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    const reply = completion.data.choices[0].message.content.trim();

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Error generating reply:", error);

    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        message: error.response.data.error.message,
      });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post("/upload-pdf", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  try {
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);

    const pdfText = pdfData.text; 

    res.status(200).json({
      success: true,
      message: "PDF file processed successfully",
      pdfContent: pdfText.substring(0, 1000), 
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ success: false, message: "Error processing PDF file" });
  }
});

module.exports = router;
