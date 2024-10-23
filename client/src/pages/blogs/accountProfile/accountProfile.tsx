import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useAccount } from "@providers/account.provider";
import { API_ACCOUNT, API_IMAGE } from "@config/app.config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Icon from "@components/Icon/Icon";
import { VisuallyHiddenInput } from "@components/ModalStyle/modal.styled";
import { Formik, Form, Field } from "formik";
import { IUpdateAccountProfile } from "@interfaces/account.interface";
import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";

const AccountProfile = () => {
  const { account } = useAccount();
  const navigate = useNavigate();
  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  if (!token) return null;
  const matches = useMediaQuery("(max-width:600px)");
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  useEffect(() => {
    if (!account) {
      navigate("/no-access");
    }
  }, [account, navigate]);

  if (!account) return null;

  const initialValues = {
    full_name: account?.full_name || "",
    description: account?.description || "",
    phone_number: account?.phone_number || "",
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
        `${API_ACCOUNT}/update-profile/${account._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      notifySuccess("Cập nhật thông tin thành công");
    } catch (error) {
      notifyError("Cập nhật thông tin thất bại");
      console.log(error);
    }
  };

  const openChangePasswordaccountModal = () => {
    setOpenChangePasswordModal(true);
  };
  const closeChangePasswordaccountModal = () => {
    setOpenChangePasswordModal(false);
  };
  return (
    <>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} gap="24px">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4" fontWeight={700}>
            Quản lý tài khoản của bạn
          </Typography>
          <Button
            variant="outlined"
            onClick={() => openChangePasswordaccountModal()}
          >
            Đổi mật khẩu
          </Button>
        </Box>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={matches ? "column" : "row"}
              >
                <Box
                  width={matches ? "100%" : "45%"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  gap={"24px"}
                >
                  <img
                    src={
                      previewUrl ||
                      `${API_IMAGE}/${account.image}` ||
                      "/default-avatar.png"
                    }
                    alt="account Avatar"
                    width={"50%"}
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
                    sx={{ width: "80%" }}
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
                  width={matches ? "100%" : "45%"}
                  display={"flex"}
                  gap="12px"
                  flexDirection={"column"}
                >
                  <Typography>ID</Typography>
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    value={account?._id}
                    size="small"
                  />
                  <Typography>Tên đăng nhập</Typography>
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    value={account?.email}
                    size="small"
                  />
                  <Typography>Chức nghiệp</Typography>
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    value={account?.role}
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

      <ChangePasswordModal
        open={openChangePasswordModal}
        onClose={closeChangePasswordaccountModal}
        Account={account}
        token={token}
      />
    </>
  );
};

export default AccountProfile;
