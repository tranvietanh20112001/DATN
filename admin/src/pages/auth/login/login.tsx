import { Button, TextField, Typography } from "@mui/material";
import logo from "@assets/Official_logo_of_Greenwich_Vietnam.png";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { IAccountLogin } from "@interfaces/account.interface";
import { useState } from "react";
import { API_ACCOUNT } from "@config/app.config";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const initialValues: IAccountLogin = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: IAccountLogin) => {
    setApiError(null);
    try {
      const response = await axios.post(`${API_ACCOUNT}/login`, values);
      console.log("Login successful:", response.data);

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/trang-chu");
    } catch (error) {
      console.error("Login failed:", error);
      setApiError("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <img src={logo} height={"200px"} width={"400px"} alt="Logo" />
      <Typography variant="h5" component="h6" fontWeight={"bold"}>
        Đăng nhập cho Nhân viên
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            <Field
              as={TextField}
              variant="outlined"
              type="text"
              label="Email"
              id="email"
              name="email"
              fullWidth
            />

            <Field
              as={TextField}
              variant="outlined"
              type="password"
              label="Password"
              id="password"
              name="password"
              fullWidth
            />

            {apiError && (
              <div style={{ color: "red", textAlign: "center" }}>
                {apiError}
              </div>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
