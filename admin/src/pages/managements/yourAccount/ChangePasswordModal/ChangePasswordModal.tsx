import { SmallModal } from "@components/ModalStyle/modal.styled";
import { IAccount } from "@interfaces/account.interface";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import { API_ACCOUNT } from "@config/app.config";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  Account: IAccount;
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
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${API_ACCOUNT}/change-password/`,
          {
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Password changed successfully:", response.data);
        onClose();
        notifySuccess("Thay đổi mật khẩu thành công");
      } catch (error) {
        console.error("Error changing password:", error);
        notifyError("Thay đổi mật khẩu thất bại");
        console.log(values.newPassword, values.oldPassword);
        console.log(token);
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
            label={"Mật khẩu cũ"}
            variant="outlined"
            size="small"
            fullWidth
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label={"Mật khẩu mới"}
            variant="outlined"
            size="small"
            fullWidth
            name="newPassword"
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