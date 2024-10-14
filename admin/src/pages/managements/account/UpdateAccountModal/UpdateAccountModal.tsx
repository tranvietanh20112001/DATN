import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { IAccount } from "@interfaces/account.interface";

import { useState } from "react";
import { API_ACCOUNT, API_IMAGE } from "@config/app.config";
import axios from "axios";
import Icon from "@components/Icon/Icon";
import { notifySuccess } from "@utils/notification.utils";
import {
  style,
  VisuallyHiddenInput,
} from "@components/ModalStyle/modal.styled";

export default function UpdateAccountModal({
  open,
  handleClose,
  fetchAccounts,
  AccountData,
}: {
  open: boolean;
  handleClose: () => void;
  fetchAccounts: () => void;
  AccountData: IAccount;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues: IAccount = {
    _id: AccountData._id,
    full_name: AccountData.full_name,
    description: AccountData.description,
    campus: AccountData.campus || "",
    image: AccountData.image,
    email: AccountData.email,
    role: AccountData.role,
    phone_number: AccountData.phone_number,
    faculty: AccountData.faculty,
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: IAccount) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("campus", values.campus);
    formData.append("email", values.email);
    formData.append("faculty", values.faculty);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.put(
        `${API_ACCOUNT}/update-account/${AccountData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Cập nhật tài khoản thành công");
      handleClose();
      fetchAccounts();
      console.log(response);
    } catch (error) {
      setMessage("error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setPreviewUrl(null);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={"bold"}
        >
          Cập nhật tài khoản
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
                <Typography>Tên tài khoản</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="full_name"
                  id="full_name"
                />
                <Typography>Email</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="email"
                  id="email"
                />

                <Typography>Mô tả</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="description"
                  id="description"
                  multiline
                />

                {AccountData.image && !image && (
                  <img
                    src={`${API_IMAGE}/${AccountData.image}`}
                    alt="Account's Image"
                    width="50%"
                    height={"50%"}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      aspectRatio: "2 / 2",
                      margin: "0 auto",
                    }}
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
                  Cập nhật tài khoản
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
