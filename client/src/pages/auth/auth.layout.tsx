import { Box, Typography } from "@mui/material";
import login from "@assets/login.jpg";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "@assets/logo.jpg";
const AuthLayout = () => {
  const naviagate = useNavigate();

  return (
    <>
      <Box width={"100%"} height={"100vh"} display={"flex"}>
        <Box
          width={"50%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src={login}
            width={"90%"}
            height={"90%"}
            style={{ borderRadius: "8px" }}
          ></img>
        </Box>

        <Box
          width={"50%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
            <img src={logo} width={"300px"} style={{ margin: "0 auto" }}></img>
            <Outlet />
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              color="blue"
              onClick={() => naviagate("/")}
            >
              Trở lại trang chủ
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
