import { Button, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_ACCOUNT } from "@config/app.config";
import { ICreateANewAccount } from "@interfaces/account.interface";
import { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [registerData, setRegisterData] = useState<ICreateANewAccount>({
    email: "",
    password: "",
    role: "guest",
    full_name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_ACCOUNT}/register-new-account`,
        registerData
      );

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
      <Typography variant="h3" fontWeight={"bold"} textAlign={"center"}>
        Đăng ký ngay
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        <Typography fontWeight={"bold"}>Tên đăng nhập</Typography>
        <TextField
          variant="outlined"
          value={registerData.email}
          onChange={handleInputChange}
          required
          name="email"
        />
        <Typography fontWeight={"bold"}>Mật khẩu</Typography>
        <TextField
          variant="outlined"
          name="password"
          type="password"
          required
          onChange={handleInputChange}
        />

        <Typography fontWeight={"bold"}>Họ và tên</Typography>
        <TextField
          variant="outlined"
          value={registerData.full_name}
          onChange={handleInputChange}
          name="full_name"
        />

        <Button
          variant="contained"
          size="large"
          disabled={loading}
          type="submit"
        >
          {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
        </Button>
      </form>

      {apiError && (
        <Typography color="error" textAlign="center" marginTop={2}>
          {apiError}
        </Typography>
      )}
      <Divider />

      <Typography textAlign={"center"}>
        Nếu bạn đã có tài khoản, hãy{" "}
        <Typography
          component={"span"}
          fontWeight={"bold"}
          color="blue"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => navigate("/dang-nhap")}
        >
          đăng nhập
        </Typography>{" "}
        tại đây
      </Typography>
    </>
  );
};

export default SignUp;
