import { Button, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const naviagate = useNavigate();
  return (
    <>
      <Typography variant="h3" fontWeight={"bold"} textAlign={"center"}>
        Đăng ký ngay
      </Typography>
      <Typography fontWeight={"bold"}>Tên đăng nhập</Typography>
      <TextField variant="outlined"></TextField>
      <Typography fontWeight={"bold"}>Mật khẩu</Typography>
      <TextField variant="outlined" type="password"></TextField>

      <Typography fontWeight={"bold"}>Họ và tên</Typography>
      <TextField
        variant="outlined"
        sx={{ backgroundColor: "lightgray" }}
      ></TextField>

      <Button variant="contained" size="large">
        Đăng ký ngay
      </Button>

      <Divider />

      <Typography textAlign={"center"}>
        Nếu bạn đã có tài khoản, hãy{" "}
        <Typography
          component={"span"}
          fontWeight={"bold"}
          color="blue"
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={() => naviagate("/dang-nhap")}
        >
          đăng nhập
        </Typography>{" "}
        tại đây
      </Typography>
    </>
  );
};

export default SignUp;
