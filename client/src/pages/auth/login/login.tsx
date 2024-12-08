import { API_ACCOUNT } from "@config/app.config";
import { IAccountLogin } from "@interfaces/account.interface";
import { Button, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState<IAccountLogin>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_ACCOUNT}/login`, loginData);

      const { token } = response.data;
      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      setApiError("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <Typography variant="h3" fontWeight="bold" textAlign="center">
        Đăng nhập ngay
      </Typography>

      <form onSubmit={handleSubmit}>
        <Typography fontWeight="bold">Tên đăng nhập</Typography>
        <TextField
          variant="outlined"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <Typography fontWeight="bold" marginTop={2}>
          Mật khẩu
        </Typography>
        <TextField
          variant="outlined"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <Typography
          textAlign="right"
          color="primary"
          fontWeight="bold"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/quen-mat-khau")}
          marginTop={1}
        >
          Quên mật khẩu?
        </Typography>

        <Button
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        {apiError && (
          <Typography color="error" textAlign="center" marginTop={2}>
            {apiError}
          </Typography>
        )}
      </form>

      <Divider sx={{ marginY: 4 }} />

      <Typography textAlign="center">
        Nếu bạn chưa có tài khoản, hãy{" "}
        <Typography
          component="span"
          fontWeight="bold"
          color="blue"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/dang-ky")}
        >
          đăng ký
        </Typography>{" "}
        tại đây
      </Typography>
    </>
  );
};

export default Login;
