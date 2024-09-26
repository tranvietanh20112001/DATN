// components/Navbar.tsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme, Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  open: boolean;
  handleDrawerClose: () => void;
  links: Link[];
}

export const Navbar: React.FC<NavbarProps> = ({
  open,
  handleDrawerClose,
  links,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 60,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
      }}
    >
      <div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{ justifyContent: open ? "initial" : "center" }}
              onClick={() => navigate(link.url)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
