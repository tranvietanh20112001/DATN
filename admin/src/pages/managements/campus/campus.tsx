import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ICampus } from "@interfaces/campus.interface";
import { useEffect, useState } from "react";
import { API_CAMPUS } from "@config/app.config";
import AddNewCampusModal from "./AddNewCampusModal/AddNewCampusModal";
import Color from "@components/Color/Color";
import Icon from "@components/Icon/Icon";
import DeleteCampusModal from "./DeleteCampusModal/DeleteCampusModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import UpdateCampusModal from "./UpdateCampusModal/UpdateCampusModal";

import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";
import Spinner from "@components/Spinner/Spinner";

const Campus = () => {
  const [campuses, setCampus] = useState<ICampus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<ICampus | null>(null);

  // Add New Campus Modal
  const [openAddNewCampusModal, setOpenAddNewCampusModal] = useState(false);
  const handleOpenAddNewCampusModal = () => setOpenAddNewCampusModal(true);
  const handleCloseAddNewCampusModal = () => setOpenAddNewCampusModal(false);
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

  //Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (Campus: ICampus) => {
    setSelectedCampus(Campus);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedCampus(null);
  };

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

  //Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateCampusModal = (Campus: ICampus) => {
    setSelectedCampus(Campus);
    setOpenUpdateModal(true);
  };

  const closeUpdateCampusModal = () => {
    setOpenUpdateModal(false);
    setSelectedCampus(null);
  };

  if (loading) return <Spinner />;
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
                      onClick={() => openUpdateCampusModal(campus)}
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

      {selectedCampus && (
        <UpdateCampusModal
          open={openUpdateModal}
          onClose={closeUpdateCampusModal}
          campus={selectedCampus}
          fetchCampuses={fetchCampuses}
        />
      )}
    </>
  );
};

export default Campus;
