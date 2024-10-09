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

  const [openAddNewteacherModal, setOpenAddNewteacherModal] = useState(false);
  const handleOpenAddNewteacherModal = () => setOpenAddNewteacherModal(true);
  const handleCloseAddNewteacherModal = () => setOpenAddNewteacherModal(false);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);
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

  //Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (Teacher: ITeacher) => {
    setSelectedTeacher(Teacher);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedTeacher(null);
  };

  const handleDeleteTeacher = async () => {
    if (selectedTeacher) {
      try {
        await axios.delete(
          `${API_TEACHER}/delete-Teacher/${selectedTeacher._id}`
        );
        setTeachers((prevTeacher) =>
          prevTeacher.filter((Teacher) => Teacher._id !== selectedTeacher._id)
        );
        notifySuccess("Giáo viên đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa Giáo viên thất bại");
        setError("Lỗi khi xóa Giáo viên.");
      }
    }
  };

  //Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateTeacherModal = (teacher: ITeacher) => {
    setSelectedTeacher(teacher);
    setOpenUpdateModal(true);
  };

  const closeUpdateTeacherModal = () => {
    setOpenUpdateModal(false);
    setSelectedTeacher(null);
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
          Quản lý giáo viên
        </Typography>

        <Button
          variant="contained"
          sx={{ width: "240px" }}
          onClick={handleOpenAddNewteacherModal}
        >
          Thêm mới giáo viên
        </Button>

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
              {teachers.map((teacher) => (
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
      <AddNewTeacherModal
        open={openAddNewteacherModal}
        handleClose={handleCloseAddNewteacherModal}
        fetchTeachers={fetchTeachers}
      />

      {selectedTeacher && (
        <DeleteTeacherModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteTeacher}
          teacherName={selectedTeacher.full_name}
        />
      )}

      {selectedTeacher && (
        <UpdateTeacherModal
          open={openUpdateModal}
          handleClose={closeUpdateTeacherModal}
          Teacher={selectedTeacher}
          fetchTeachers={fetchTeachers}
        />
      )}
    </>
  );
};

export default teacher;
