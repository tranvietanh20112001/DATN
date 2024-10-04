import { Box, Typography } from "@mui/material";
import { IProject } from "@interfaces/project.interface";
import { API_IMAGE, API_STUDENT } from "@config/app.config";
import { useEffect, useState } from "react";
import { IStudent } from "@interfaces/student.interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getColorsForDepartment } from "../Color/Color";
interface CardProps {
  project: IProject;
}

const Card: React.FC<CardProps> = ({ project }) => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudent = async () => {
      const _id = project.student_id;
      if (!_id) return;

      try {
        const response = await axios.get<IStudent>(
          `${API_STUDENT}/get-student-by-id?_id=${_id}`
        );
        setStudent(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [project.student_id]);

  const { textColor, backgroundColor } = getColorsForDepartment(
    project.faculty
  );

  return (
    <Box
      width={"30%"}
      height={"480px"}
      borderRadius={"12px"}
      border={"1px solid lightGray"}
      marginBottom={"12px"}
      padding="16px"
      display={"flex"}
      gap={"24px"}
      flexDirection={"column"}
      sx={{
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.025)",
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <img
        src={`${API_IMAGE}/${project.link_img_banner}`}
        width="100%"
        height={"240px"}
        style={{ borderRadius: "6px" }}
        alt="Project Banner"
      />
      <Box width={"50%"}>
        <Typography
          bgcolor={backgroundColor}
          padding={"12px"}
          borderRadius="6px"
          color={textColor}
          fontWeight={"bold"}
          sx={{ display: "block" }}
        >
          {project.faculty}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold">
        {project.title}
      </Typography>

      {loading && <Typography>Loading student data...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {student && (
        <>
          <Box
            width={"100%"}
            display={"flex"}
            gap={"24px"}
            height={36}
            alignItems={"center"}
          >
            <img
              src={`${API_IMAGE}/${student.image}`}
              height={36}
              width={36}
              style={{ borderRadius: "50%" }}
            ></img>
            <Typography variant="body2" color="gray" fontSize={"16px"}>
              {student.full_name}
            </Typography>
            <Typography variant="body2" color="gray" fontSize={"16px"}>
              {project.year}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Card;
