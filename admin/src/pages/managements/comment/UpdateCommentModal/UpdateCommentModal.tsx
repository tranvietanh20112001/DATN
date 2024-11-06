import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { IUpdateComment, IComment } from "@interfaces/comment.interface";
import { useState } from "react";
import { API_COMMENT } from "@config/app.config";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import { style } from "@components/ModalStyle/modal.styled";

export default function UpdateCommentModal({
  open,
  onClose,
  fetchComments,
  Comment,
}: {
  open: boolean;
  onClose: () => void;
  fetchComments: () => void;
  Comment: IComment;
}) {
  const initialValues: IUpdateComment = {
    content: Comment.content,
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: IUpdateComment) => {
    const formData = new FormData();
    formData.append("content", values.content);

    try {
      const response = await axios.put(
        `${API_COMMENT}/update-comment/${Comment._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Cập nhật Bình luận thành công");
      console.log(response);
      onClose();
      fetchComments();
    } catch (error) {
      notifyError("Cập nhật Bình luận thất bại");
      setMessage("error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cập nhật Bình luận
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"12px"}
              width={"100%"}
              mt={"24px"}
            >
              <Typography>ID dự án</Typography>
              <Field
                as={TextField}
                variant="outlined"
                name="projectId"
                id="projectId"
                disabled
              />
              <Typography>Nội dung Bình luận</Typography>
              <Field
                as={TextField}
                variant="outlined"
                name="content"
                id="content"
              />

              <Button variant="contained" color="primary" type="submit">
                Cập nhật
              </Button>
            </Box>
          </Form>
        </Formik>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
}
