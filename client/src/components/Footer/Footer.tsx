import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.jpg";

const Footer = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:780px)");
  const QuickLinks = [
    {
      title: "Trang chủ",
      path: "/",
    },
    {
      title: "Cơ sở",
      path: "co-so",
    },
    {
      title: "Chuyên ngành",
      path: "chuyen-nganh",
    },
    {
      title: "Về chúng tôi",
      path: "ve-chung-toi",
    },
  ];
  return (
    <>
      <Box
        width={"100%"}
        height={isMobile ? "auto" : 200}
        padding={"25px 0"}
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems={isMobile ? "center" : "normal"}
        gap={isMobile ? "24px" : 0}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"12px"}
          mr={isMobile ? "0" : "80px"}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Về chúng tôi
          </Typography>
          <Typography variant="body2" width={isMobile ? "100%" : 280}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </Typography>
          <Typography variant="body1">
            <Typography component={"span"} fontWeight={"bold"}>
              Email :
            </Typography>
            info@jstemplate.net
          </Typography>
          <Typography variant="body1">
            <Typography component={"span"} fontWeight={"bold"}>
              Phone :{" "}
            </Typography>
            880 123 456 789
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"12px"}
          width={"100%"}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Truy cập nhanh
          </Typography>
          {QuickLinks.map((quicklink, index) => (
            <Typography
              sx={{
                "&:hover": { cursor: "pointer", textDecoration: "'underline'" },
              }}
              onClick={() => navigate(`${quicklink.path}`)}
              variant="body1"
              key={index}
            >
              {quicklink.title}
            </Typography>
          ))}
        </Box>
        <img src={logo} width={200}></img>
      </Box>
    </>
  );
};

export default Footer;
