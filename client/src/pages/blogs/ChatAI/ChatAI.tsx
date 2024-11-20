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
import axios from "axios";

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
      const response = await axios.post(`${API_CHAT}/chat-with-bot`, {
        message: input,
      });

      if (response.status === 200) {
        const botMessage: ChatMessage = {
          sender: "bot",
          text: response.data.reply,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Bot không thể trả lời lúc này." },
        ]);
      }
    } catch (error: any) {
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
    const file = event.target.files?.[0]; // Lấy file đầu tiên từ input
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // Đưa file vào FormData để gửi tới API

    setLoading(true); // Hiển thị trạng thái "Đang xử lý"

    try {
      const response = await fetch(`${API_CHAT}/upload-pdf`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Thêm tin nhắn tóm tắt vào danh sách
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Tóm tắt PDF: ${data.summary}` },
        ]);
      } else {
        // Thêm tin nhắn thông báo lỗi nếu API trả về trạng thái không thành công
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Không thể xử lý file PDF lúc này." },
        ]);
      }
    } catch (error) {
      console.error("Lỗi khi tải file PDF:", error);
      // Thêm tin nhắn thông báo lỗi
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Đã xảy ra lỗi khi tải file PDF." },
      ]);
    } finally {
      setLoading(false); // Ẩn trạng thái "Đang xử lý"
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
