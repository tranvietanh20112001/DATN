import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { API_CHAT } from "@config/app.config";

const MiniChat = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      setMessages((prev) => [...prev, { user: "You", text: currentMessage }]);
      setCurrentMessage("");

      try {
        setLoading(true);

        const response = await axios.post(`${API_CHAT}/chat-with-bot`, {
          message: currentMessage,
        });
        const gptResponse = response.data.reply;

        setMessages((prev) => [
          ...prev,
          { user: "ChatGPT", text: gptResponse },
        ]);
      } catch (error) {
        console.error("Error calling ChatGPT API:", error);
        setMessages((prev) => [
          ...prev,
          {
            user: "ChatGPT",
            text: "Sorry, an error occurred while processing your message.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatText = (text: string) => {
    // Tách các đoạn văn bản bằng dấu ngắt dòng để tạo sự cách biệt giữa các ý
    return text.split("\n").map((line, index) => (
      <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
        {line}
      </Typography>
    ));
  };

  if (!isChatOpen) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <IconButton
          color="primary"
          onClick={() => setIsChatOpen(true)}
          sx={{
            backgroundColor: "white",
            boxShadow: 3,
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <ChatIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: isExpanded ? 600 : 300,
        boxShadow: 3,
      }}
    >
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Mini Chat</Typography>
          <Box>
            <IconButton onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton onClick={() => setIsChatOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ marginY: 1 }} />
        <Box
          sx={{
            height: isExpanded ? 300 : 200,
            overflowY: "auto",
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.user === "You" ? "flex-end" : "flex-start",
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  padding: 1.5,
                  borderRadius: 2,
                  backgroundColor:
                    message.user === "You" ? "#d1e7ff" : "#f0f0f0",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  boxShadow: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color:
                      message.user === "You"
                        ? "primary.main"
                        : "text.secondary",
                  }}
                >
                  {message.user}:
                </Typography>
                {formatText(message.text)}{" "}
                {/* Format the text with line breaks */}
              </Box>
            </Box>
          ))}
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>
        <Box display="flex" gap={1}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type a message"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={loading}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MiniChat;
