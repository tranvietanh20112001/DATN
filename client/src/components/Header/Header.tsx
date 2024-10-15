import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from "@providers/account.provider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "@assets/logo.jpg";
import LogoutModal from "@components/LogoutModal/LogoutModal";

const TypoStyled = {
  cursor: "pointer",
  "&:hover": {
    fontWeight: "bold",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const { account } = useAccount();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openLogoutModal, setOpenLogoutModal] = React.useState<boolean>(false);
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
        <img src={logo} width={"15%"} alt="Logo" />

        <Box
          width={"40%"}
          height={50}
          display={"flex"}
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
              {account.avatar ? (
                <Avatar alt={account.email} src={account.avatar} />
              ) : (
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              )}
            </IconButton>
            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
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
              <MenuItem onClick={() => navigate("/profile")}>
                Hồ sơ của bạn
              </MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>Cài đặt</MenuItem>
              <MenuItem onClick={openModal}>Đăng xuất</MenuItem>
            </Menu>
          </Box>
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
