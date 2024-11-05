import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_PROJECT } from "@config/app.config";
import { getColorsForDepartment } from "@components/Color/Color";
import Color from "@components/Color/Color";
import GetStudentProfile from "./getStudentProfile.tsx/getStudentProfile";
import Icon from "@components/Icons/Icon";
import ProjectComment from "./projectComment.tsx/projectComment";
import { useNavigate } from "react-router-dom";
const ProjectDetail = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [views, setViews] = useState(Number);
  const navigate = useNavigate();

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

  let imges = project.images[0];

  if (typeof imges === "string") {
    imges = JSON.parse(imges);
  }

  const { textColor, backgroundColor } = getColorsForDepartment(
    project.faculty
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
      <Box display={"flex"} gap={"12px"} flexWrap={"wrap"}>
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
        src={`${project.link_img_banner}`}
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

      <Box display="flex" flexWrap="wrap" gap="12px" mt="16px">
        {imges.map((image: string, index: number) => (
          <img
            src={image}
            alt={`Project Image ${index + 1}`}
            style={{ width: "100%", borderRadius: "6px" }}
            key={index}
          />
        ))}
      </Box>
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
      <Divider />
      {token && <ProjectComment projectId={project._id} />}
      {!token && (
        <Box
          width={"80%"}
          height={"auto"}
          padding={"12px 0"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap="12px"
          flexDirection={"column"}
          textAlign={"center"}
          margin={"0 auto"}
        >
          <Typography>
            Bạn cần đăng nhập để có thể xem và bình luận về bài viết
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/dang-nhap")}>
            Đăng nhập ngay
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProjectDetail;
