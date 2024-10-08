import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  campusTitle: string;
}

const DeleteCampusModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onDelete,
  campusTitle,
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
          Xác nhận xóa dự án
        </Typography>
        <Typography mb={2}>
          Bạn có chắc chắn muốn xóa cơ sở <strong>{campusTitle}</strong> không?
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="contained">
            Hủy
          </Button>
          <Button
            onClick={() => {
              onDelete();
              onClose();
            }}
            variant="contained"
            color="secondary"
          >
            Xóa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteCampusModal;
