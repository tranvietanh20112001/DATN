import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; // Import an icon for sending comments
import { IComment } from "@interfaces/comment.interface";
import axios from "axios";
import { API_ACCOUNT, API_COMMENT } from "@config/app.config";
import { useAccount } from "@providers/account.provider";

interface ProjectCommentProps {
  projectId: string;
}

const ProjectComment: React.FC<ProjectCommentProps> = ({ projectId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { account } = useAccount();
  const [users, setUsers] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(
        `${API_COMMENT}/get-comments-by-project/${projectId}`
      );
      const commentsData = response.data;
      setComments(commentsData);

      const userPromises = commentsData.map(async (comment: IComment) => {
        const userResponse = await axios.get(
          `${API_ACCOUNT}/get-account-by-id/${comment.userId}`
        );
        return { userId: comment.userId, userData: userResponse.data };
      });

      const usersData = await Promise.all(userPromises);
      const usersMap = usersData.reduce((acc, { userId, userData }) => {
        acc[userId] = userData;
        return acc;
      }, {});
      setUsers(usersMap);
    };
    fetchComments();
  }, [projectId]);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const response = await axios.post(`${API_COMMENT}/add-new-comment`, {
        projectId: projectId,
        content: newComment,
        userId: account?._id,
      });

      setComments([...comments, response.data]);
      setNewComment("");
    }
  };

  return (
    <Box width="100%" display={"flex"} flexDirection={"column"} gap={"20px"}>
      <Typography variant="h6">Bình luận</Typography>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Avatar
          src={account?.image}
          alt={account?.full_name}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Viết bình luận ở đây..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                  >
                    <SendIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {comments.length > 0 ? (
        comments.map((comment, index) => {
          const user = users[comment.userId];

          return (
            <>
              <Box
                display="flex"
                gap="12px"
                border={"0.25px"}
                key={index}
                alignItems={"center"}
              >
                <Avatar
                  src={user?.image || "/default-avatar.png"}
                  alt={user?.full_name || "User"}
                />
                <Box width={"100%"}>
                  <Box
                    borderRadius={"8px"}
                    bgcolor={"lightGray"}
                    padding={"8px"}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {user?.full_name || "User"}
                    </Typography>
                    <Typography variant="body1" mt="8px">
                      {comment.content}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    bgcolor={"white"}
                  >
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </>
          );
        })
      ) : (
        <Typography variant="body2" color="textSecondary" textAlign="center">
          Chưa có bình luận nào.
        </Typography>
      )}
    </Box>
  );
};

export default ProjectComment;
