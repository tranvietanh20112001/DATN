import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function DeleteFacultyModal({
  open,
  onClose,
  handleDelete,
  facultyName,
}: {
  open: boolean;
  onClose: () => void;
  handleDelete: () => Promise<void>;
  facultyName: string;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Xác nhận xóa chuyên ngành
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Bạn có chắc chắn muốn xóa khoa <strong>"{facultyName}"</strong> không?
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="contained">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleDelete();
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
}
