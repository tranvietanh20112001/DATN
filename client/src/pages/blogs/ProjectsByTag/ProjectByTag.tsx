import Card from "@components/Card/Card";
import { API_PROJECT } from "@config/app.config";
import { IProject } from "@interfaces/project.interface";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProjectByTag = () => {
  const { tag } = useParams<string>() || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!tag) {
      navigate("/");
    }
  }, [tag, navigate]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);

  const filteredProjects = tag
    ? projects.filter((project) => {
        // Parse the stringified tags into an actual array
        const parsedTags = JSON.parse(project.tags[0]);

        // Now filter based on tag
        return parsedTags
          .map((tag: string) => tag.toLowerCase())
          .includes(tag.toLowerCase());
      })
    : [];

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

  return (
    <Box display={"flex"} flexDirection={"column"} gap="12px">
      <Typography variant="h4">
        Các đồ án có tag{" "}
        <Typography
          component={"span"}
          fontWeight={"bold"}
          color="red"
          variant="h4"
        >
          #{tag}
        </Typography>
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box display="flex" justifyContent="center">
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <Box
          width={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {filteredProjects.map((project) => (
            <Card key={project._id} project={project} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProjectByTag;
