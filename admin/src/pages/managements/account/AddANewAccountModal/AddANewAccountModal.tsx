import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ICreateANewAccount } from "../../../../interfaces/account.interface";
import { useState } from "react";
import { API_ACCOUNT } from "../../../../config/app.config";
import axios from "axios";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

import { style } from "@components/ModalStyle/modal.styled";

export default function AddANewAccountModal({
  open,
  handleClose,
  fetchAccounts,
}: {
  open: boolean;
  handleClose: () => void;
  fetchAccounts: () => void;
}) {
  const initialValues: ICreateANewAccount = {
    email: "",
    password: "",
    role: "",
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (
    values: ICreateANewAccount,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await axios.post(
        `${API_ACCOUNT}/create-new-account`,
        values
      );
      setMessage(response.data.message);
      handleClose();
      fetchAccounts();
      resetForm();
      window;
    } catch (error) {
      setMessage("An error occurred while creating the account.");
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={"bold"}
        >
          Thêm mới tài khoản
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              <Field
                as={TextField}
                label="Tên tài khoản"
                variant="outlined"
                name="email"
                id="email"
              />

              <Field
                as={TextField}
                label="Mật khẩu"
                variant="outlined"
                name="password"
                type="password"
                id="password"
              />

              <FormControl variant="outlined">
                <InputLabel>Chức nghiệp</InputLabel>
                <Select
                  label="Chức nghiệp"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"editor"}>Editor</MenuItem>
                  <MenuItem value={"guest"}>Guest</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" color="primary" type="submit">
                Tạo mới
              </Button>
            </Form>
          )}
        </Formik>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
}
