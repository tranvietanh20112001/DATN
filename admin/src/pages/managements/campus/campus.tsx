import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ICampus } from "../../../interfaces/campus.interface";
import { useEffect, useState } from "react";
import { API_CAMPUS } from "../../../config/app.config";
import AddNewCampusModal from "./AddNewCampusModal/AddNewCampusModal";
import Color from "../../../components/Color/Color";
import Icon from "@components/Icon/Icon";
import DeleteCampusModal from "./DeleteCampusModal/DeleteCampusModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Color.PrimaryBlue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Campus = () => {
  const [campuses, setCampus] = useState<ICampus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<ICampus | null>(null);

  const [openAddNewCampusModal, setOpenAddNewCampusModal] = useState(false);
  const handleOpenAddNewCampusModal = () => setOpenAddNewCampusModal(true);
  const handleCloseAddNewCampusModal = () => setOpenAddNewCampusModal(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const fetchCampuses = async () => {
    try {
      const response = await axios.get<ICampus[]>(
        `${API_CAMPUS}/get-all-campuses`
      );
      setCampus(response.data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  const handleDeleteCampus = async () => {
    if (selectedCampus) {
      try {
        await axios.delete(`${API_CAMPUS}/delete-campus/${selectedCampus._id}`);
        setCampus((prevCampus) =>
          prevCampus.filter((Campus) => Campus._id !== selectedCampus._id)
        );
        notifySuccess("Dự án đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa dự án thất bại");
        setError("Lỗi khi xóa dự án.");
      }
    }
  };

  const openModal = (Campus: ICampus) => {
    setSelectedCampus(Campus);
    setOpenDeleteModal(true);
  };

  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedCampus(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}
      >
        <Typography variant="h4" fontWeight={700}>
          Quản lý cơ sở
        </Typography>

        <Button
          onClick={handleOpenAddNewCampusModal}
          variant="contained"
          sx={{ width: "240px" }}
        >
          Thêm mới cơ sở
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Tên cơ sở</StyledTableCell>
                <StyledTableCell>Địa chỉ</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campuses.map((campus) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={campus._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {campus._id}
                  </StyledTableCell>
                  <StyledTableCell>{campus.name}</StyledTableCell>
                  <StyledTableCell>{campus.location}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.EditIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.Yellow },
                      }}
                      // onClick={() => openEditCampusModal(Campus)}
                    />
                    <Icon.DeleteIcon
                      sx={{
                        cursor: "pointer",
                        ":hover": { color: Color.Red },
                      }}
                      onClick={() => openModal(campus)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <AddNewCampusModal
        open={openAddNewCampusModal}
        handleClose={handleCloseAddNewCampusModal}
        fetchCampuses={fetchCampuses}
      />

      {selectedCampus && (
        <DeleteCampusModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteCampus}
          campusTitle={selectedCampus.name}
        />
      )}
    </>
  );
};

export default Campus;
