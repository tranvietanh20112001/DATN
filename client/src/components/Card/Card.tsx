import { Box, Typography, useMediaQuery } from "@mui/material";
import { IProject } from "@interfaces/project.interface";
import { API_STUDENT } from "@config/app.config";
import { useEffect, useState } from "react";
import { IStudent } from "@interfaces/student.interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Color, { getColorsForDepartment } from "../Color/Color";
import Icon from "@components/Icons/Icon";

interface CardProps {
  project: IProject;
}

const Card: React.FC<CardProps> = ({ project }) => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:700px)");
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
      height={isMobile ? "240px" : "560px"}
      borderRadius={"12px"}
      border={"1px solid lightGray"}
      marginBottom={"12px"}
      padding="16px"
      display={"flex"}
      boxShadow={3}
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
        src={`${project.link_img_banner}`}
        width="100%"
        height={isMobile ? "120px" : "240px"}
        style={{ borderRadius: "6px" }}
        alt="Project Banner"
      />

      <Typography
        bgcolor={backgroundColor}
        padding={"12px"}
        borderRadius="6px"
        color={textColor}
        fontWeight={"bold"}
        sx={{ display: "block" }}
        fontSize={isMobile ? "8px" : "normal"}
      >
        {project.faculty}
      </Typography>

      <Typography
        variant={isMobile ? "h6" : "h4"}
        fontWeight="bold"
        sx={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          textOverflow: "ellipsis",
        }}
      >
        {project.title}
      </Typography>

      {loading && <Typography>Loading student data...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {student && (
        <Box
          width={"100%"}
          display={"flex"}
          gap={"24px"}
          height={36}
          alignItems={"center"}
        >
          <img
            src={`${student.image}`}
            height={36}
            width={36}
            style={{ borderRadius: "50%" }}
            alt="Student"
          />
          <Typography variant="body2" color="gray" fontSize={"16px"}>
            {student.full_name}
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            fontSize={"16px"}
            display={isMobile ? "none" : "block"}
          >
            {project.year}
          </Typography>
        </Box>
      )}

      <Box display={"flex"} gap={"12px"}>
        <Box
          width={"50px"}
          display={"flex"}
          border={"0.25px solid red"}
          borderRadius={"8px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"5px 10px"}
          color={Color.red}
        >
          <Icon.FavoriteBorderIcon color="error" /> {project.number_of_likes}
        </Box>
        <Box
          width={"50px"}
          display={"flex"}
          border={"0.25px solid blue"}
          borderRadius={"8px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"5px 10px"}
          color={Color.blue}
        >
          <Icon.VisibilityIcon /> {project.number_of_views}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
