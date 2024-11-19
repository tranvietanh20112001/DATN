import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { API_CHAT } from "@config/app.config";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const ChatWithBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);
    try {
      const response = await fetch(`${API_CHAT}/chat-with-bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: ChatMessage = { sender: "bot", text: data.reply };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Bot không thể trả lời lúc này." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Đã xảy ra lỗi khi gửi tin nhắn." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_CHAT}/upload-pdf`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `PDF đã được xử lý: ${data.pdfContent}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Không thể tải file PDF lúc này." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Đã xảy ra lỗi khi tải file PDF." },
      ]);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Typography variant="h4" gutterBottom>
        Chat với AI
      </Typography>
      <Paper
        sx={{
          height: "80%",
          overflowY: "auto",
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          marginBottom: 2,
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
                textAlign: message.sender === "user" ? "right" : "left",
              }}
            >
              <Paper
                sx={{
                  padding: 1,
                  backgroundColor:
                    message.sender === "user" ? "#1976d2" : "#e0e0e0",
                  color: message.sender === "user" ? "#fff" : "#000",
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: "flex", gap: 1 }}>
        <label htmlFor="upload-pdf">
          <input
            id="upload-pdf"
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <IconButton component="span" color="primary">
            <AttachFileIcon />
          </IconButton>
        </label>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSendMessage();
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatWithBot;
