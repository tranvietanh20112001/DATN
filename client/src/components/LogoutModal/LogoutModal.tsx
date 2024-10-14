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
      <Box sx={SmallModal}>
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
