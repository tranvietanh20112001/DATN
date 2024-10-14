import { SmallModal } from "@components/ModalStyle/modal.styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  teacherName: string;
}

const DeleteTeacherModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onDelete,
  teacherName,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={SmallModal}>
        <Typography variant="h6" mb={2}>
          Xác nhận xóa Giáo viên
        </Typography>
        <Typography mb={2}>
          Bạn có chắc chắn muốn xóa giáo viên <strong>{teacherName}</strong>{" "}
          không?
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

export default DeleteTeacherModal;
