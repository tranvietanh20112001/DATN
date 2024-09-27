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
import AddNewStudentModal from "./AddNewStudentModal/AddNewStudentModal";
import { useEffect, useState } from "react";
import Color from "../../../components/Color/Color";
import { IStudent } from "../../../interfaces/student.interface";
import axios from "axios";
import { API_STUDENT } from "../../../config/app.config";

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

const Student = () => {
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

  useEffect(() => {
    fetchStudents();
  }, []);

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

        <Button
          variant="contained"
          sx={{ width: "240px" }}
          onClick={handleOpenAddNewStudentModal}
        >
          Thêm mới sinh viên
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>MSSV</StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>Cơ sở</StyledTableCell>
                <StyledTableCell>Chuyên ngành</StyledTableCell>
                <StyledTableCell>Mô tả</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Students.map((Student) => (
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
                  <StyledTableCell>{Student.description}</StyledTableCell>
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
    </>
  );
};

export default Student;
