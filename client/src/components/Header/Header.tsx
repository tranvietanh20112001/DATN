import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from "@providers/account.provider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu icon

import logo from "@assets/logo.jpg";
import LogoutModal from "@components/LogoutModal/LogoutModal";
import { API_IMAGE } from "@config/app.config";

const TypoStyled = {
  cursor: "pointer",
  "&:hover": {
    fontWeight: "bold",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const { account } = useAccount();
  const isMobile = useMediaQuery("(max-width:700px)");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const closeModal = () => {
    setOpenLogoutModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const openModal = () => {
    setOpenLogoutModal(true);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        width={"100%"}
        height={"100px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <img src={logo} width={isMobile ? "40%" : "15%"} alt="Logo" />

        <Box
          width={"50%"}
          height={50}
          display={isMobile ? "none" : "flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={TypoStyled} onClick={() => navigate("/")}>
            Trang chủ
          </Typography>
          <Typography sx={TypoStyled} onClick={() => navigate("/co-so")}>
            Cơ sở
          </Typography>
          <Typography sx={TypoStyled} onClick={() => navigate("/chuyen-nganh")}>
            Chuyên ngành
          </Typography>
          <Typography sx={TypoStyled} onClick={() => navigate("/ve-chung-toi")}>
            Về chúng tôi
          </Typography>
        </Box>

        {account ? (
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleMenuClick}>
              {account.image ? (
                <Avatar alt={account.email} src={`${account.image}`} />
              ) : (
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              )}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={() => navigate("/ho-so-cua-ban")}>
                Hồ sơ của bạn
              </MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>Cài đặt</MenuItem>
              <MenuItem onClick={openModal}>Đăng xuất</MenuItem>
            </Menu>
          </Box>
        ) : isMobile ? (
          <>
            <IconButton onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={() => navigate("/")}>Trang chủ</MenuItem>
              <MenuItem onClick={() => navigate("/co-so")}>Cơ sở</MenuItem>
              <MenuItem onClick={() => navigate("/chuyen-nganh")}>
                Chuyên ngành
              </MenuItem>
              <MenuItem onClick={() => navigate("/ve-chung-toi")}>
                Về chúng tôi
              </MenuItem>
              <MenuItem onClick={() => navigate("/dang-nhap")}>
                Đăng nhập
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="outlined"
            sx={{ height: 40, width: "120px" }}
            onClick={() => navigate("/dang-nhap")}
          >
            Đăng nhập
          </Button>
        )}
      </Box>

      <LogoutModal
        open={openLogoutModal}
        onClose={closeModal}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
