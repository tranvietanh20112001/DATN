import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ICreateANewTag } from "@interfaces/tag.interface";
import { API_TAG } from "@config/app.config";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import { style } from "@components/ModalStyle/modal.styled";
import { HexColorPicker } from "react-colorful";

export default function AddNewTagModal({
  open,
  handleClose,
  fetchTags,
}: {
  open: boolean;
  handleClose: () => void;
  fetchTags: () => void;
}) {
  const initialValues: ICreateANewTag = {
    name: "",
    description: "",
    color: "#aabbcc",
  };

  const onSubmit = async (
    values: ICreateANewTag,
    { setFieldError, resetForm }: any
  ) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("color", values.color);

    try {
      const response = await axios.post(`${API_TAG}/create-new-tag`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifySuccess("Tạo Tag mới thành công");
      console.log(response);
      resetForm();
      handleClose();
      fetchTags();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setFieldError("name", "Tên Tag là bắt buộc");
      } else {
        notifyError("Tạo Tag mới thất bại");
      }
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm mới Tag
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
                <Typography>Tên tag</Typography>
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
                  Tạo mới
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
