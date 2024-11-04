import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import Icon from "@components/Icon/Icon";
import { ICampus } from "@interfaces/campus.interface";
import { useState } from "react";
import { API_CAMPUS } from "@config/app.config";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import {
  style,
  VisuallyHiddenInput,
} from "@components/ModalStyle/modal.styled";
import uploadFileToFirebase from "../../../../firebase";
import { UUID } from "uuidjs";

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

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    `${campus.image}`
  );
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ICampus) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("description", values.description);

    if (image) {
      try {
        const imgURL = await uploadFileToFirebase(
          `ProductThumbnails/${UUID.generate()}`,
          image
        );
        formData.append("imgURL", imgURL);
      } catch (error) {
        notifyError("Upload ảnh thất bại");
        console.error("Image upload error:", error);
        return;
      }
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
