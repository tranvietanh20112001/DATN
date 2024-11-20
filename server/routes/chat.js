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
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": message}
    ],
      max_tokens: 150,
    });

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Error generating reply:", error);

    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        message: error.response.data.error.message,
      });
    } else {
      console.log('rrvrrvrfrdedgd')
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
    // Parse the PDF file to extract text
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    const pdfText = pdfData.text;

    // Optional: Limit the text to a specific length to avoid token limit issues
    const maxTextLength = 3000; // Adjust this limit based on your needs
    const truncatedText = pdfText.length > maxTextLength 
      ? pdfText.substring(0, maxTextLength) 
      : pdfText;

    // Use OpenAI to summarize the text
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant that summarizes text to Vietnamese." },
        { role: "user", content: `Summarize the following text: ${truncatedText}` },
      ],
      max_tokens: 500, // Limit tokens for the summary
    });

    const summary = completion.choices[0].message.content.trim();

    res.status(200).json({
      success: true,
      message: "PDF summarized successfully",
      summary: summary,
    });
  } catch (error) {
    console.error("Error processing PDF or generating summary:", error);

    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        message: error.response.data.error.message,
      });
    } else {
      res.status(500).json({ success: false, message: "Error processing PDF or generating summary" });
    }
  }
});

module.exports = router;
