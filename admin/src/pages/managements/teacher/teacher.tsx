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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddNewTeacherModal from "./AddNewTeacherModal/AddNewTeacherModal";
import { useEffect, useState } from "react";
import Color from "../../../components/Color/Color";
import { ITeacher } from "../../../interfaces/teacher.interface";
import axios from "axios";
import { API_TEACHER } from "../../../config/app.config";
import DeleteTeacherModal from "./DeleteTeacherModal/DeleteTeacherModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import Icon from "@components/Icon/Icon";
import UpdateTeacherModal from "./UpdateTeacherModal/UpdateTeacherModal";

const teacher = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add and Update Modals
  const [openAddNewTeacherModal, setOpenAddNewTeacherModal] = useState(false);
  const handleOpenAddNewTeacherModal = () => setOpenAddNewTeacherModal(true);
  const handleCloseAddNewTeacherModal = () => setOpenAddNewTeacherModal(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateTeacherModal = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setOpenUpdateModal(true);
  };
  const closeUpdateTeacherModal = () => {
    setOpenUpdateModal(false);
    setSelectedTeacher(null);
  };

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedTeacher(null);
  };

  // Filters
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

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

  const fetchTeachers = async () => {
    try {
      const response = await axios.get<ITeacher[]>(
        `${API_TEACHER}/get-all-teachers`
      );
      setTeachers(response.data);
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
    fetchTeachers();
  }, []);

  const handleDeleteTeacher = async () => {
    if (selectedTeacher) {
      try {
        await axios.delete(
          `${API_TEACHER}/delete-teacher/${selectedTeacher._id}`
        );
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher._id !== selectedTeacher._id)
        );
        notifySuccess("Giáo viên đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa giáo viên thất bại");
        setError("Lỗi khi xóa giáo viên.");
      }
    }
  };

  // Dropdown for Campus and Faculty
  const campuses = Array.from(
    new Set(teachers.map((teacher) => teacher.campus))
  ); // Unique campuses
  const uniqueFaculties = teachers
    .filter((teacher) => !selectedCampus || teacher.campus === selectedCampus)
    .map((teacher) => teacher.faculty)
    .filter((faculty, index, self) => self.indexOf(faculty) === index); // Unique faculties

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
          Quản lý giáo viên
        </Typography>

        {/* Dropdown filters */}
        <Box display="flex" gap="20px">
          {/* Dropdown for Campus */}
          <FormControl>
            <Select
              value={selectedCampus || ""}
              onChange={(e) => setSelectedCampus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Tất cả cơ sở</MenuItem>
              {campuses.map((campus) => (
                <MenuItem key={campus} value={campus}>
                  {campus}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown for Faculty */}
          <FormControl>
            <Select
              value={selectedFaculty || ""}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Tất cả chuyên ngành</MenuItem>
              {uniqueFaculties.map((faculty) => (
                <MenuItem key={faculty} value={faculty}>
                  {faculty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ width: "240px" }}
            onClick={handleOpenAddNewTeacherModal}
          >
            Thêm mới giáo viên
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>Cơ sở</StyledTableCell>
                <StyledTableCell>Chuyên ngành</StyledTableCell>
                <StyledTableCell>Mô tả</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers
                .filter(
                  (teacher) =>
                    (!selectedCampus || teacher.campus === selectedCampus) &&
                    (!selectedFaculty || teacher.faculty === selectedFaculty)
                )
                .map((teacher) => (
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={teacher._id}
                  >
                    <StyledTableCell component="th" scope="row">
                      {teacher._id}
                    </StyledTableCell>
                    <StyledTableCell>{teacher.full_name}</StyledTableCell>
                    <StyledTableCell>{teacher.campus}</StyledTableCell>
                    <StyledTableCell>{teacher.faculty}</StyledTableCell>
                    <StyledTableCell>{teacher.description}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Icon.EditIcon
                        sx={{
                          marginRight: "16px",
                          cursor: "pointer",
                          ":hover": { color: Color.Yellow },
                        }}
                        onClick={() => openUpdateTeacherModal(teacher)}
                      />
                      <Icon.DeleteIcon
                        sx={{
                          cursor: "pointer",
                          ":hover": { color: Color.Red },
                        }}
                        onClick={() => openModal(teacher)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Teacher Modal */}
      <AddNewTeacherModal
        open={openAddNewTeacherModal}
        handleClose={handleCloseAddNewTeacherModal}
        fetchTeachers={fetchTeachers}
      />

      {/* Delete Teacher Modal */}
      {selectedTeacher && (
        <DeleteTeacherModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteTeacher}
          teacherName={selectedTeacher.full_name}
        />
      )}

      {/* Update Teacher Modal */}
      {selectedTeacher && (
        <UpdateTeacherModal
          open={openUpdateModal}
          handleClose={closeUpdateTeacherModal}
          teacherData={selectedTeacher}
          fetchTeachers={fetchTeachers}
        />
      )}
    </>
  );
};

export default teacher;
