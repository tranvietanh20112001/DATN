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
import { useUser } from "@providers/user.provider"; // Assuming you have a user provider
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Fallback icon

import logo from "@assets/logo.jpg";

const TypoStyled = {
  cursor: "pointer",
  "&:hover": {
    fontWeight: "bold",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Assuming `useUser` returns the current user

  // State for the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate("/logout");
  };

  return (
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

      {user ? (
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleMenuClick}>
            {user.avatar ? (
              <Avatar alt={user.email} src={user.avatar} />
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
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
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
  );
};

export default Header;
