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
  Select,
  MenuItem, // Import MenuItem để tạo các item cho dropdown
} from "@mui/material";
import AddNewFacultyModal from "./AddNewFacultyModal/AddNewFacultyModal";
import { useEffect, useState } from "react";
import Color from "../../../components/Color/Color";
import { IFaculty } from "../../../interfaces/faculty.interface";
import axios from "axios";
import { API_FACULTY, API_CAMPUS } from "../../../config/app.config";
import DeleteFacultyModal from "./DeleteFacultyModal/DaleteFacultyModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import Icon from "@components/Icon/Icon";
import UpdateFacultyModal from "./UpdateFacultyModal/UpdateFacultyModal";
import { ICampus } from "../../../interfaces/campus.interface"; // Import ICampus interface
import { SelectChangeEvent } from "@mui/material";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FacultyTable = () => {
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [campuses, setCampuses] = useState<ICampus[]>([]); // State for campuses
  const [selectedCampus, setSelectedCampus] = useState<string>(""); // State for selected campus
  const [filteredFaculties, setFilteredFaculties] = useState<IFaculty[]>([]); // Filtered faculties

  const [openAddNewFacultyModal, setOpenAddNewFacultyModal] = useState(false);
  const handleOpenAddNewFacultyModal = () => setOpenAddNewFacultyModal(true);
  const handleCloseAddNewFacultyModal = () => setOpenAddNewFacultyModal(false);
  const fetchFaculties = async () => {
    try {
      const response = await axios.get<IFaculty[]>(
        `${API_FACULTY}/get-all-faculties`
      );
      setFaculties(response.data);
      setFilteredFaculties(response.data);
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

  const fetchCampuses = async () => {
    try {
      const response = await axios.get<ICampus[]>(
        `${API_CAMPUS}/get-all-campuses`
      );
      setCampuses(response.data);
    } catch (error) {
      console.error("Error fetching campuses", error);
    }
  };

  useEffect(() => {
    fetchFaculties();
    fetchCampuses();
  }, []);

  useEffect(() => {
    if (selectedCampus === "") {
      setFilteredFaculties(faculties);
    } else {
      const filtered = faculties.filter(
        (faculty) => faculty.campus === selectedCampus
      );
      setFilteredFaculties(filtered);
    }
  }, [selectedCampus, faculties]);

  const handleCampusChange = (event: SelectChangeEvent) => {
    setSelectedCampus(event.target.value as string);
  };

  // Delete Faculty Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedFaculty, setSelectedFaculty] = useState<IFaculty | null>(null);

  const openModal = (faculty: IFaculty) => {
    setSelectedFaculty(faculty);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedFaculty(null);
  };
  const deleteFaculty = async () => {
    if (selectedFaculty) {
      try {
        await axios.delete(
          `${API_FACULTY}/delete-faculty/${selectedFaculty._id}`
        );
        setFaculties((prevFaculty) =>
          prevFaculty.filter((faculty) => faculty._id !== selectedFaculty._id)
        );
        notifySuccess("Chuyên ngành đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa chuyên ngành thất bại");
        setError("Lỗi khi xóa chuyên ngành.");
      }
    }
  };

  //Update Faculty Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateFacultyModal = (faculty: IFaculty) => {
    setSelectedFaculty(faculty);
    setOpenUpdateModal(true);
  };

  const closeUpdateFacultyModal = () => {
    setOpenUpdateModal(false);
    setSelectedFaculty(null);
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
          Quản lý chuyên ngành
        </Typography>

        <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            sx={{ width: "240px" }}
            onClick={() => handleOpenAddNewFacultyModal}
          >
            Thêm mới chuyên ngành
          </Button>

          <Select
            value={selectedCampus}
            onChange={handleCampusChange}
            displayEmpty
            sx={{ width: "240px" }}
            size="small"
          >
            <MenuItem value="">
              <em>Tất cả cơ sở</em>
            </MenuItem>
            {campuses.map((campus) => (
              <MenuItem key={campus._id} value={campus.name}>
                {campus.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Chuyên ngành</StyledTableCell>
                <StyledTableCell>Cơ sở</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFaculties.map((faculty) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={faculty._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {faculty._id}
                  </StyledTableCell>
                  <StyledTableCell>{faculty.name}</StyledTableCell>
                  <StyledTableCell>{faculty.campus}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.EditIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.Yellow },
                      }}
                      onClick={() => openUpdateFacultyModal(faculty)}
                    />
                    <Icon.DeleteIcon
                      sx={{
                        cursor: "pointer",
                        ":hover": { color: Color.Red },
                      }}
                      onClick={() => openModal(faculty)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <AddNewFacultyModal
        open={openAddNewFacultyModal}
        handleClose={handleCloseAddNewFacultyModal}
      />

      {selectedFaculty && (
        <DeleteFacultyModal
          open={openDeleteModal}
          onClose={closeModal}
          handleDelete={deleteFaculty}
          facultyName={selectedFaculty.name}
        />
      )}

      {selectedFaculty && (
        <UpdateFacultyModal
          open={openUpdateModal}
          handleClose={closeUpdateFacultyModal}
          faculty={selectedFaculty}
          fetchFaculties={fetchFaculties}
        />
      )}
    </>
  );
};

export default FacultyTable;
