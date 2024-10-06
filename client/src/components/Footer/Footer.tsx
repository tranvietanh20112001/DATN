import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.jpg";
const Footer = () => {
  const navigate = useNavigate();
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
        height={200}
        padding={"25px 0"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
          <Typography variant="h5" fontWeight={"bold"}>
            Về chúng tôi
          </Typography>
          <Typography variant="body2" width={280}>
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
        <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
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
        <Box>
          <img src={logo} width={200}></img>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
