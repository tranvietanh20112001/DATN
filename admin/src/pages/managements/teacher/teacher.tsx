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

const teacher = () => {
  const [openAddNewteacherModal, setOpenAddNewteacherModal] = useState(false);
  const handleOpenAddNewteacherModal = () => setOpenAddNewteacherModal(true);
  const handleCloseAddNewteacherModal = () => setOpenAddNewteacherModal(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: Color.DarkBlue,
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

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchTeachers();
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddNewTeacherModal
        open={openAddNewteacherModal}
        handleClose={handleCloseAddNewteacherModal}
      />
    </>
  );
};

export default teacher;
