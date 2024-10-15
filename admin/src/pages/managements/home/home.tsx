import { Box, Typography } from "@mui/material";
import { useAccount } from "@providers/account.provider";
import I from "@components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import Color from "@components/Color/Color";
interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const links: Link[] = [
  {
    name: "Trang chủ",
    url: "/trang-chu",
    icon: <I.HomeIcon />,
  },
  {
    name: "Quản lý đồ án",
    url: "/do-an",
    icon: <I.FolderIcon />,
  },
  {
    name: "Quản lý sinh viên",
    url: "/sinh-vien",
    icon: <I.SchoolIcon />,
  },
  {
    name: "Quản lý cơ sở",
    url: "/co-so",
    icon: <I.LocationCityIcon />,
  },
  {
    name: "Quản lý giáo viên",
    url: "/giao-vien",
    icon: <I.GroupsIcon />,
  },
  {
    name: "Quản lý chuyên ngành",
    url: "/chuyen-nganh",
    icon: <I.SupervisedUserCircleIcon />,
  },
];

const AccountLink: Link[] = [
  {
    name: "Quản lý danh sách tài khoản",
    url: "/tai-khoan",
    icon: <I.ManageAccountsIcon />,
  },
  {
    name: "Quản lý tài khoản của bạn",
    url: "/tai-khoan-cua-ban",
    icon: <I.AccountCircleIcon />,
  },
];

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
          {links.map((link, index) => (
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
          {AccountLink.map((link, index) => (
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
