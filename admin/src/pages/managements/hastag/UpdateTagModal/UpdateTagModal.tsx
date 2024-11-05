import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ITag } from "@interfaces/tag.interface";
import { useState } from "react";
import { API_TAG } from "@config/app.config";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import { style } from "@components/ModalStyle/modal.styled";
import { HexColorPicker } from "react-colorful";

export default function UpdateTagModal({
  open,
  onClose,
  fetchTags,
  Tag,
}: {
  open: boolean;
  onClose: () => void;
  fetchTags: () => void;
  Tag: ITag;
}) {
  const initialValues: ITag = {
    _id: Tag._id,
    name: Tag.name,
    description: Tag.description,
    color: Tag.color,
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ITag, { setFieldError, resetForm }: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("color", values.color);

    resetForm();
    try {
      const response = await axios.put(
        `${API_TAG}/update-tag/${Tag._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Cập nhật Tag thành công");
      console.log(response);
      onClose();
      fetchTags();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setFieldError("name", "Tên Tag là bắt buộc");
        notifyError("Tạo Tag mới thất bại");
      } else {
        notifyError("Tạo Tag mới thất bại");
        setMessage(error);
      }
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
          Cập nhật tag
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ errors, values, setFieldValue }) => (
            <Form>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"12px"}
                width={"100%"}
                mt={"24px"}
              >
                <Typography>Tên Tag</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="name"
                  id="name"
                  helperText={errors.name}
                  error={Boolean(errors.name)}
                />

                <Typography>Mã màu tag</Typography>
                <HexColorPicker
                  color={values.color}
                  onChange={(newColor) => setFieldValue("color", newColor)}
                  style={{ width: "100%" }}
                />
                <Box display={"flex"} gap={2}>
                  <Typography>Mã màu : {values.color}</Typography>
                  <Box width={"40px"} height={"20px"} bgcolor={values.color} />
                </Box>

                <Typography>Mô tả</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="description"
                  id="description"
                  multiline
                  maxRows={4}
                />

                <Button variant="contained" color="primary" type="submit">
                  Cập nhật
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
}
