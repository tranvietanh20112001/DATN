import { Box, Typography } from "@mui/material";
import C from "../Color/Color";
import I from "../Icon/Icon";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      width={"320px"}
      height={"100%"}
      bgcolor={C.Gray}
      display={"flex"}
      flexDirection={"column"}
      gap={"20px"}
    >
      <Box
        width={"100%"}
        height={"48px"}
        display={"flex"}
        alignItems={"center"}
        gap={"12px"}
        mt={"24px"}
      >
        <I.HomeIcon sx={{ marginLeft: "24px" }} />
        <Typography
          variant="h6"
          sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={() => navigate("/trang-chu")}
        >
          Trang chủ
        </Typography>
      </Box>
      <Box
        width={"100%"}
        height={"48px"}
        display={"flex"}
        alignItems={"center"}
        gap={"12px"}
      >
        <I.FolderIcon sx={{ marginLeft: "24px" }} />
        <Typography
          variant="h6"
          sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={() => navigate("/do-an")}
        >
          Quản lý đồ án
        </Typography>
      </Box>
      <Box
        width={"100%"}
        height={"48px"}
        display={"flex"}
        alignItems={"center"}
        gap={"12px"}
      >
        <I.SchoolIcon sx={{ marginLeft: "24px" }} />
        <Typography
          variant="h6"
          sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={() => navigate("/sinh-vien")}
        >
          Quản lý sinh viên
        </Typography>
      </Box>
      <Box
        width={"100%"}
        height={"48px"}
        display={"flex"}
        alignItems={"center"}
        gap={"12px"}
      >
        <I.LocationCityIcon sx={{ marginLeft: "24px" }} />
        <Typography
          variant="h6"
          sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={() => navigate("/co-so")}
        >
          Quản lý cơ sở
        </Typography>
      </Box>
      <Box
        width={"100%"}
        height={"48px"}
        display={"flex"}
        alignItems={"center"}
        gap={"12px"}
      >
        <I.GroupsIcon sx={{ marginLeft: "24px" }} />
        <Typography
          variant="h6"
          sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={() => navigate("/giao-vien")}
        >
          Quản lý giáo viên
        </Typography>
      </Box>
      <Box
        width={"100%"}
        height={"48px"}
        display={"flex"}
        alignItems={"center"}
        gap={"12px"}
      >
        <I.GroupsIcon sx={{ marginLeft: "24px" }} />
        <Typography
          variant="h6"
          sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" } }}
          onClick={() => navigate("/chuyen-nganh")}
        >
          Quản lý chuyên ngành
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
