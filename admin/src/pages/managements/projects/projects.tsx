import { Box, Button, TextField, Typography } from "@mui/material";
import { API_PROJECT } from "../../../config/app.config";
import { useState, useEffect } from "react";
import axios from "axios";
import { IProject } from "../../../interfaces/project.interface";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Color from "../../../components/Color/Color";
import { useNavigate } from "react-router-dom";
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

const TextHover = {
  cursor: "pointer",
  ":hover": {
    color: Color.DarkBlue,
    textDecoration: "true",
    fontWeight: "Bold",
  },
};

const ListOfProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<IProject[]>(
          `${API_PROJECT}/get-all-projects`
        );
        setProjects(response.data);
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

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      gap={"40px"}
    >
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4" fontWeight={700}>
          Quản lý đồ án
        </Typography>
        <TextField variant="outlined" label="Tìm kiếm" size="small"></TextField>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/tao-moi-do-an")}
        >
          Thêm mới
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tiêu đề đồ án</StyledTableCell>
              <StyledTableCell align="right">Sinh viên</StyledTableCell>
              <StyledTableCell align="right">Giảng viên</StyledTableCell>
              <StyledTableCell align="right">Cơ sở</StyledTableCell>
              <StyledTableCell align="right">Chuyên ngành</StyledTableCell>
              <StyledTableCell align="right">Điểm</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={project._id}
              >
                <StyledTableCell component="th" scope="row" sx={TextHover}>
                  {project.title}
                </StyledTableCell>
                <StyledTableCell align="right" sx={TextHover}>
                  {project.student_name}
                </StyledTableCell>
                <StyledTableCell align="right" sx={TextHover}>
                  {project.teacher_name}
                </StyledTableCell>
                <StyledTableCell align="right" sx={TextHover}>
                  {project.campus}
                </StyledTableCell>
                <StyledTableCell align="right" sx={TextHover}>
                  {project.faculty}
                </StyledTableCell>
                <StyledTableCell align="right">{project.grade}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListOfProjects;
