import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

interface logutModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const logoutModal: React.FC<logutModalProps> = ({
  open,
  onClose,
  onLogout,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Xác nhận đăng xuất
        </Typography>
        <Typography mb={2}>Bạn có chắc chắn muốn đăng xuất không ?</Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="contained">
            Hủy
          </Button>
          <Button
            onClick={() => {
              onLogout();
              onClose();
            }}
            variant="contained"
            color="secondary"
          >
            Đăng xuất
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default logoutModal;
