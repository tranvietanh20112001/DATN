import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddNewStudentModal from "./AddNewStudentModal/AddNewStudentModal";
import { useEffect, useState } from "react";
import { IStudent } from "@interfaces/student.interface";
import axios from "axios";
import { API_IMAGE, API_STUDENT } from "@config/app.config";
import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";
import UpdateStudentModal from "./UpdateStudentModal/UpdateStudentModal";
import DeleteStudentModal from "./DeleteStudentModal/DeleteStudentModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import Icon from "@components/Icon/Icon";
import Color from "@components/Color/Color";

const Student = () => {
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  // Add New Student Modal
  const [openAddNewStudentModal, setOpenAddNewStudentModal] = useState(false);
  const handleOpenAddNewStudentModal = () => setOpenAddNewStudentModal(true);
  const handleCloseAddNewStudentModal = () => setOpenAddNewStudentModal(false);

  const [Students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get<IStudent[]>(
        `${API_STUDENT}/get-all-Students`
      );
      setStudents(response.data);
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

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (Student: IStudent) => {
    setSelectedStudent(Student);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedStudent(null);
  };

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateStudentModal = (Student: IStudent) => {
    setSelectedStudent(Student);
    setOpenUpdateModal(true);
  };
  const closeUpdateStudentModal = () => {
    setOpenUpdateModal(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      try {
        await axios.delete(
          `${API_STUDENT}/delete-Student/${selectedStudent._id}`
        );
        setStudents((prevStudents) =>
          prevStudents.filter((Student) => Student._id !== selectedStudent._id)
        );
        notifySuccess("Giáo viên đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa giáo viên thất bại");
        setError("Lỗi khi xóa giáo viên.");
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search filter logic
  const filteredStudents = Students.filter(
    (student) =>
      (student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.MSSV.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCampus || student.campus === selectedCampus) &&
      (!selectedFaculty || student.faculty === selectedFaculty)
  );

  const campuses = Array.from(
    new Set(Students.map((student) => student.campus))
  );
  const uniqueFaculties = Students.filter(
    (student) => !selectedCampus || student.campus === selectedCampus
  )
    .map((student) => student.faculty)
    .filter((faculty, index, self) => self.indexOf(faculty) === index);

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
          Quản lý sinh viên
        </Typography>

        <Box display="flex" gap="20px">
          <Button
            variant="contained"
            sx={{ width: "240px" }}
            onClick={handleOpenAddNewStudentModal}
          >
            Thêm mới sinh viên
          </Button>

          <FormControl size="small">
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

          <FormControl size="small">
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

          <TextField
            size="small"
            variant="outlined"
            placeholder="Tìm kiếm theo tên hoặc MSSV"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "240px" }}
          />
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>MSSV</StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>Cơ sở</StyledTableCell>
                <StyledTableCell>Chuyên ngành</StyledTableCell>
                <StyledTableCell>Hình ảnh</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((Student) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={Student._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {Student.MSSV}
                  </StyledTableCell>
                  <StyledTableCell>{Student.full_name}</StyledTableCell>
                  <StyledTableCell>{Student.campus}</StyledTableCell>
                  <StyledTableCell>{Student.faculty}</StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={`${API_IMAGE}/${Student.image}`}
                      width={"80px"}
                      style={{
                        borderRadius: "50%",
                        aspectRatio: "2/2",
                        objectFit: "cover",
                      }}
                    ></img>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.EditIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.Yellow },
                      }}
                      onClick={() => openUpdateStudentModal(Student)}
                    />
                    <Icon.DeleteIcon
                      sx={{
                        cursor: "pointer",
                        ":hover": { color: Color.Red },
                      }}
                      onClick={() => openModal(Student)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddNewStudentModal
        open={openAddNewStudentModal}
        handleClose={handleCloseAddNewStudentModal}
      />

      {/* Delete Student Modal */}
      {selectedStudent && (
        <DeleteStudentModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteStudent}
          StudentName={selectedStudent.full_name}
        />
      )}

      {/* Update Student Modal */}
      {selectedStudent && (
        <UpdateStudentModal
          open={openUpdateModal}
          handleClose={closeUpdateStudentModal}
          StudentData={selectedStudent}
          fetchStudents={fetchStudents}
        />
      )}
    </>
  );
};

export default Student;
