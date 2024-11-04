import { Box, Typography } from "@mui/material";
import { useAccount } from "@providers/account.provider";
import { useNavigate } from "react-router-dom";
import Color from "@components/Color/Color";
import L from "@components/Link/Link";

const styledBox = {
  cursor: "pointer",
  width: "200px",
  height: "200px",
  border: `0.25px solid ${Color.NavyBlue}`,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "40px",
  justifyContent: "center",
  color: Color.DarkBlue,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  textAlign: "center",
  "&:hover": {
    backgroundColor: Color.PrimaryBlue,
    color: Color.White,
    border: "none",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
};

const home = () => {
  const { Account } = useAccount();
  const navigate = useNavigate();
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"40px"}>
        <Typography variant="h4">
          Xin chào <strong>{Account?.full_name}</strong>
        </Typography>
        <Typography variant="h5">Quản lý đồ án</Typography>
        <Box width={"100%"} display={"flex"} gap={"24px"}>
          {L.links.map((link, index) => (
            <Box
              sx={styledBox}
              onClick={() => navigate(`${link.url}`)}
              key={index}
            >
              {link.icon}

              {link.name}
            </Box>
          ))}
        </Box>
        <Typography variant="h5">Quản lý tài khoản</Typography>
        <Box width={"100%"} display={"flex"} gap={"24px"}>
          {L.AccountLink.map((link, index) => (
            <Box
              sx={styledBox}
              onClick={() => navigate(`${link.url}`)}
              key={index}
            >
              {link.icon}

              {link.name}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default home;
