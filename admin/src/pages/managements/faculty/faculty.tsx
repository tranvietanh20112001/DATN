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
import AddNewFacultyModal from "./AddNewFacultyModal/AddNewFacultyModal";
import { useEffect, useState } from "react";
import Color from "../../../components/Color/Color";
import { IFaculty } from "../../../interfaces/faculty.interface";
import axios from "axios";
import { API_FACULTY } from "../../../config/app.config";

const faculty = () => {
  const [openAddNewFacultyModal, setOpenAddNewFacultyModal] = useState(false);
  const handleOpenAddNewFacultyModal = () => setOpenAddNewFacultyModal(true);
  const handleCloseAddNewFacultyModal = () => setOpenAddNewFacultyModal(false);

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

  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get<IFaculty[]>(
          `${API_FACULTY}/get-all-faculties`
        );
        setFaculties(response.data);
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

    fetchFaculties();
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
          Quản lý chuyên ngành
        </Typography>

        <Button
          variant="contained"
          sx={{ width: "240px" }}
          onClick={handleOpenAddNewFacultyModal}
        >
          Thêm mới chuyên ngành
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Chuyên ngành</StyledTableCell>
                <StyledTableCell>Cơ sở</StyledTableCell>
                <StyledTableCell>Mô tả</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faculties.map((faculty) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={faculty._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {faculty._id}
                  </StyledTableCell>
                  <StyledTableCell>{faculty.name}</StyledTableCell>
                  <StyledTableCell>{faculty.campus}</StyledTableCell>
                  <StyledTableCell>{faculty.description}</StyledTableCell>
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
    </>
  );
};

export default faculty;
