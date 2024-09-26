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
import Icon from "../../../components/Icon/Icon";
import DeleteProjectModal from "./DeleteProjectModal/DeleteProjectModal";

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

const ListOfProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
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

  const handleDeleteProject = async () => {
    if (selectedProject) {
      try {
        await axios.delete(
          `${API_PROJECT}/delete-project/${selectedProject._id}`
        );
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== selectedProject._id)
        );
        alert("Dự án đã được xóa thành công!");
      } catch (error) {
        setError("Lỗi khi xóa dự án.");
      }
    }
  };

  const openModal = (project: IProject) => {
    setSelectedProject(project);
    setOpenDeleteModal(true);
  };

  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedProject(null);
  };

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
              <StyledTableCell align="right">Chức năng</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={project._id}
              >
                <StyledTableCell component="th" scope="row">
                  {project.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {project.student_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {project.teacher_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {project.campus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {project.faculty}
                </StyledTableCell>
                <StyledTableCell align="right">{project.grade}</StyledTableCell>
                <StyledTableCell align="right">
                  <Icon.EditIcon sx={{ marginRight: "16px" }} />
                  <Icon.DeleteIcon
                    sx={{
                      cursor: "pointer",
                      ":hover": { color: Color.Red },
                    }}
                    onClick={() => openModal(project)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProject && (
        <DeleteProjectModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteProject}
          projectTitle={selectedProject.title}
        />
      )}
    </Box>
  );
};

export default ListOfProjects;
