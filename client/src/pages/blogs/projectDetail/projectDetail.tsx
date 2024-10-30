import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_IMAGE, API_PROJECT } from "@config/app.config";
import { getColorsForDepartment } from "@components/Color/Color";
import Color from "@components/Color/Color";
import GetStudentProfile from "./getStudentProfile.tsx/getStudentProfile";
import Icon from "@components/Icons/Icon";
const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [views, setViews] = useState(Number);
  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  if (!id) return <Typography>No project found.</Typography>;

  const fetchProjectDetail = async () => {
    try {
      const response = await axios.get(
        `${API_PROJECT}/get-project-by-id/${id}`
      );
      setProject(response.data);
      console.log(response.data);
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

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  useEffect(() => {
    const updateViews = async () => {
      try {
        const response = await axios.post(`${API_PROJECT}/${id}/view`);
        setViews(response.data.views);
      } catch (error) {
        console.error("Error updating views:", error);
      }
    };

    updateViews();
  }, [id]);

  if (loading) return <Typography>Loading project details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!project) return <Typography>No project found.</Typography>;

  const { textColor, backgroundColor } = getColorsForDepartment(
    project.faculty
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
      <Box display={"flex"} gap={"12px"}>
        <Box>
          <Typography
            bgcolor={backgroundColor}
            padding={"12px"}
            borderRadius="6px"
            color={textColor}
            fontWeight={"bold"}
            sx={{ display: "block" }}
            textAlign={"center"}
          >
            {project.faculty}
          </Typography>
        </Box>
        <Box width={"120px"}>
          <Typography
            bgcolor={Color.lightGray}
            padding={"12px"}
            borderRadius="6px"
            color={"warning"}
            fontWeight={"bold"}
            sx={{ display: "block" }}
            textAlign={"center"}
          >
            {project.campus}
          </Typography>
        </Box>
        <Box width={"60px"}>
          <Typography
            bgcolor={Color.lightGray}
            padding={"12px"}
            borderRadius="6px"
            color={"red"}
            fontWeight={"bold"}
            sx={{ display: "block" }}
            textAlign={"center"}
          >
            {project.grade}
          </Typography>
        </Box>

        <Box>
          <Typography
            bgcolor={Color.lightGray}
            padding={"12px"}
            borderRadius="6px"
            color={"black"}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            gap={"12px"}
          >
            <Icon.FavoriteBorderIcon />
            {project.number_of_likes}
          </Typography>
        </Box>

        <Box>
          <Typography
            bgcolor={Color.lightGray}
            padding={"12px"}
            borderRadius="6px"
            color={"black"}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            gap={"12px"}
          >
            <Icon.VisibilityIcon />
            {project.number_of_views}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" fontWeight="bold">
        {project.title}
      </Typography>

      <img
        src={`${API_IMAGE}/${project.link_img_banner}`}
        alt="Project Banner"
        style={{ width: "100%", borderRadius: "6px" }}
      />

      <Typography variant="h3"> Giới thiệu về dự án</Typography>
      <Typography
        variant="body1"
        component="div"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {project.description}
      </Typography>

      <iframe
        width="100%"
        height={800}
        src={getYoutubeEmbedUrl(project.link_Youtube_URL) || ""}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>

      <Divider />

      <GetStudentProfile _id={project.student_id} />
    </Box>
  );
};

export default ProjectDetail;
