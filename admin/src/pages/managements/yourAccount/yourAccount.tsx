import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useAccount } from "@providers/account.provider";
import { API_ACCOUNT, API_IMAGE } from "@config/app.config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "@components/Icon/Icon";
import { VisuallyHiddenInput } from "@components/ModalStyle/modal.styled";
import { Formik, Form, Field } from "formik";
import { IUpdateAccountProfile } from "@interfaces/account.interface";
import axios from "axios";
import { notifySuccess, notifyError } from "@utils/notification.utils"; // Import thông báo lỗi

const YourAccount = () => {
  const { Account } = useAccount();
  const navigate = useNavigate();
  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!Account) {
      navigate("/no-access");
    }
  }, [Account, navigate]);

  if (!Account) return null;

  const initialValues = {
    full_name: Account?.full_name || "",
    description: Account?.description || "",
    phone_number: Account?.phone_number || "",
    image: null,
  };

  const onSubmit = async (values: IUpdateAccountProfile) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("description", values.description);
    formData.append("phone_number", values.phone_number);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.put(
        `${API_ACCOUNT}/update-profile/${Account._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notifySuccess("Cập nhật tài khoản thành công");
      console.log(response);
    } catch (error) {
      console.log(error);
      notifyError("Cập nhật tài khoản thất bại");
    }
  };

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap="24px">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box display={"flex"} gap="24px">
              <Box
                width={"45%"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={"24px"}
              >
                <img
                  src={
                    previewUrl ||
                    `${API_IMAGE}/${Account.image}` ||
                    "/default-avatar.png"
                  }
                  alt="Account Avatar"
                  width={"400px"}
                  height={"400px"}
                  style={{
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    border: "0.25px solid black",
                  }}
                />
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<Icon.CloudUploadIcon />}
                  sx={{ width: "400px" }}
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
                      }
                      setFieldValue("image", file);
                    }}
                  />
                </Button>
              </Box>

              <Box
                width={"30%"}
                display={"flex"}
                gap="12px"
                flexDirection={"column"}
              >
                <Typography>ID</Typography>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  value={Account?._id}
                  size="small"
                />
                <Typography>Tên đăng nhập</Typography>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  value={Account?.email}
                  size="small"
                />
                <Typography>Chức nghiệp</Typography>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  value={Account?.role}
                  size="small"
                />
                <Divider style={{ margin: "24px 0" }} />

                <Typography>Tên đầy đủ</Typography>
                <Field
                  name="full_name"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  size="small"
                />

                <Typography>Mô tả</Typography>
                <Field
                  name="description"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  size="small"
                />

                <Typography>Số điện thoại</Typography>
                <Field
                  name="phone_number"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  size="small"
                />

                <Button variant="contained" color="primary" type="submit">
                  Cập nhật tài khoản
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default YourAccount;
