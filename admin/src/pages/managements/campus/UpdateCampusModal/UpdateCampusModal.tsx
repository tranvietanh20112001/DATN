import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import Icon from "@components/Icon/Icon";
import { styled } from "@mui/material";
import { ICampus } from "@interfaces/campus.interface";
import { useState } from "react";
import { API_CAMPUS, API_IMAGE } from "@config/app.config";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 540,
  maxHeight: "90vh", // Add maxHeight to handle overflow
  bgcolor: "background.paper",
  borderRadius: 4,
  p: 4,
  overflowY: "auto", // Enable scrolling
  "@media only screen and (max-width: 600px)": {
    width: "90%",
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UpdateCampusModal({
  open,
  onClose,
  fetchCampuses,
  campus,
}: {
  open: boolean;
  onClose: () => void;
  fetchCampuses: () => void;
  campus: ICampus;
}) {
  const initialValues: ICampus = {
    _id: campus._id,
    name: campus.name,
    description: campus.description,
    image: campus.image,
    location: campus.location,
  };

  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    `${API_IMAGE}/${campus.image}`
  );
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ICampus) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.put(
        `${API_CAMPUS}/update-campus/${campus._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Cập nhật cơ sở thành công");
      console.log(response);
      onClose();
      fetchCampuses();
    } catch (error) {
      notifyError("Cập nhật cơ sở thất bại");
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
          Cập nhật cơ sở
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

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    width={"476px"}
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                )}

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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setPreviewUrl(URL.createObjectURL(file));
                        setFieldValue("image", file);
                      }
                    }}
                  />
                </Button>

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
