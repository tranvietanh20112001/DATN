import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { IComment } from "@interfaces/comment.interface";
import { useEffect, useState } from "react";
import { API_COMMENT } from "@config/app.config";
import Color from "@components/Color/Color";
import Icon from "@components/Icon/Icon";
import DeleteCommentModal from "./DeleteCommentModal/DeleteCommentModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import UpdateCommentModal from "./UpdateCommentModal/UpdateCommentModal";

import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";
import Spinner from "@components/Spinner/Spinner";

const Comment = () => {
  const [Comments, setComment] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get<IComment[]>(
        `${API_COMMENT}/get-all-comments`
      );
      console.log(response.data);
      setComment(response.data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  //Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (Comment: IComment) => {
    setSelectedComment(Comment);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedComment(null);
  };

  const handleDeleteComment = async () => {
    if (selectedComment) {
      try {
        await axios.delete(
          `${API_COMMENT}/delete-comment/${selectedComment._id}`
        );
        setComment((prevComment) =>
          prevComment.filter((Comment) => Comment._id !== selectedComment._id)
        );
        notifySuccess("Dự án đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa dự án thất bại");
        setError("Lỗi khi xóa dự án.");
      }
    }
  };

  //Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateCommentModal = (Comment: IComment) => {
    setSelectedComment(Comment);
    setOpenUpdateModal(true);
  };

  const closeUpdateCommentModal = () => {
    setOpenUpdateModal(false);
    setSelectedComment(null);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}
      >
        <Typography variant="h4" fontWeight={700}>
          Quản lý Comment
        </Typography>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Comment</StyledTableCell>
                <StyledTableCell>ID người dùng</StyledTableCell>
                <StyledTableCell>ID dự án</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Comments.map((Comment) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={Comment._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {Comment._id}
                  </StyledTableCell>
                  <StyledTableCell>{Comment.content}</StyledTableCell>
                  <StyledTableCell>{Comment.userId}</StyledTableCell>
                  <StyledTableCell>{Comment.projectId}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.EditIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.Yellow },
                      }}
                      onClick={() => openUpdateCommentModal(Comment)}
                    />
                    <Icon.DeleteIcon
                      sx={{
                        cursor: "pointer",
                        ":hover": { color: Color.Red },
                      }}
                      onClick={() => openModal(Comment)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {selectedComment && (
        <DeleteCommentModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteComment}
          CommentContent={selectedComment.content}
        />
      )}

      {selectedComment && (
        <UpdateCommentModal
          open={openUpdateModal}
          onClose={closeUpdateCommentModal}
          Comment={selectedComment}
          fetchComments={fetchComments}
        />
      )}
    </>
  );
};

export default Comment;
