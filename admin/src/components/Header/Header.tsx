// components/Header.tsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
