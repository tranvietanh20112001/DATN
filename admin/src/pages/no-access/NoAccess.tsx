import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import C from "../../components/Color/Color";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Official_logo_of_Greenwich_Vietnam.png";

export default function NoAcess(): JSX.Element {
  const isMobile = useMediaQuery("(min-width:800px)");
  const navigate = useNavigate();
  return (
    <>
      <Box
        width={"100%"}
        height={"100vh"}
        display={"flex"}
        overflow={"hidden"}
        sx={{ bgcolor: C.Gray }}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box width={isMobile ? "50%" : "100%"} height={"100%"}>
          <Box
            width={"100%"}
            margin={"0 auto"}
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <img src={logo} width={"600px"} alt="Logo" />
            <Typography variant="h4" fontWeight={"bold"}>
              Bạn không có quyền truy cập trang này
            </Typography>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Chuyển về Đăng nhập
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
