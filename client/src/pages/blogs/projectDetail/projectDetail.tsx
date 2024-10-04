import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_IMAGE, API_PROJECT } from "@config/app.config";
import { getColorsForDepartment } from "@components/Color/Color";
const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  if (!id) return <Typography>No project found.</Typography>;
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(
          `${API_PROJECT}/get-project-by-id?_id=${id}`
        );
        setProject(response.data);
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

    fetchProjectDetail();
  }, [id]);

  if (loading) return <Typography>Loading project details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!project) return <Typography>No project found.</Typography>;

  const { textColor, backgroundColor } = getColorsForDepartment(
    project.faculty
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
      <Box width={"185px"}>
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
    </Box>
  );
};

export default ProjectDetail;
