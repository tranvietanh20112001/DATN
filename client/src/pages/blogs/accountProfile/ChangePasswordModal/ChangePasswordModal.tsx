import { SmallModal } from "@components/ModalStyle/modal.styled";
import { IGetAccountProfile } from "@interfaces/account.interface";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import { API_ACCOUNT } from "@config/app.config";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  Account: IGetAccountProfile;
  token: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  Account,
  token,
}) => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      oldPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Mật khẩu cũ là bắt buộc"),
      newPassword: Yup.string()
        .min(6, "Mật khẩu mới phải ít nhất 6 ký tự")
        .required("Mật khẩu mới là bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${API_ACCOUNT}/change-password/`,
          {
            newPassword: values.newPassword,
            currentPassword: values.oldPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Password changed successfully:", response.data);
        notifySuccess("Thay đổi mật khẩu thành công");
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error("Error changing password:", error);
        notifyError("Thay đổi mật khẩu thất bại");
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={SmallModal}>
        <Typography variant="h6" mb={2}>
          Đặt lại mật khẩu
        </Typography>
        <Typography mb={2}>
          Bạn có chắc chắn muốn đặt lại mật khẩu tài khoản{" "}
          <strong>{Account.email}</strong> không?
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Mật khẩu cũ"
            variant="outlined"
            size="small"
            fullWidth
            name="oldPassword"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Mật khẩu mới"
            variant="outlined"
            size="small"
            fullWidth
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button onClick={onClose} variant="contained">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Xác nhận
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
