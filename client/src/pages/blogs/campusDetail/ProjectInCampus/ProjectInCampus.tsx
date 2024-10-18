import Card from "@components/Card/Card";
import { API_PROJECT } from "@config/app.config";
import { IProject } from "@interfaces/project.interface";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectsInCampus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectsByCampusId = async () => {
    try {
      const response = await axios.get<IProject[]>(
        `${API_PROJECT}/get-projects-by-campus/${id}`
      );
      setProjects(response.data);
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
    fetchProjectsByCampusId();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return projects.length === 0 ? (
    <Typography variant="h6" align="center">
      Không tìm thấy dự án
    </Typography>
  ) : (
    <Box
      width={"100%"}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        width="100%"
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        mb={2}
      >
        {projects.map((project) => (
          <Card project={project} key={project._id} />
        ))}
      </Box>
    </Box>
  );
};
export default ProjectsInCampus;
