import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import Icon from "../../../../components/Icon/Icon";
import { ICreateANewCampus } from "../../../../interfaces/campus.interface";
import { useState } from "react";
import { API_CAMPUS } from "../../../../config/app.config";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import {
  style,
  VisuallyHiddenInput,
} from "@components/ModalStyle/modal.styled";

export default function AddNewCampusModal({
  open,
  handleClose,
  fetchCampuses,
}: {
  open: boolean;
  handleClose: () => void;
  fetchCampuses: () => void;
}) {
  const initialValues: ICreateANewCampus = {
    name: "",
    description: "",
    image: null,
    location: "",
  };
  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ICreateANewCampus) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(
        `${API_CAMPUS}/create-new-campus`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Tạo cơ sở mới thành công");
      console.log(response);
      handleClose();
      fetchCampuses();
    } catch (error) {
      notifyError("Tạo cơ sở mới thất bại");
      setMessage("error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm mới cơ sở
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"12px"}
                width={"100%"}
                mt={"24px"}
              >
                <Typography>Tên cơ sở</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="name"
                  id="name"
                />
                <Typography>Địa chỉ</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="location"
                  id="location"
                />
                <Typography>Mô tả</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="description"
                  id="description"
                  multiline
                  maxRows={4}
                />

                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<Icon.CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                      setFieldValue("image", file);
                    }}
                  />
                </Button>
                {previewUrl && (
                  <img src={previewUrl} alt="Image Preview" width="100%" />
                )}
                <Button variant="contained" color="primary" type="submit">
                  Tạo mới
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
