import Banner from "@components/Banner/Banner";
import {
  Box,
  Divider,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import Card from "@components/Card/Card";
import { useEffect, useState } from "react";
import { IProject } from "@interfaces/project.interface";
import axios from "axios";
import { API_PROJECT } from "@config/app.config";

const Homepage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"12px"}
      >
        <Banner />
        <Divider />
        <Box
          width={"100%"}
          height={"100px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4" fontWeight={"bold"}>
            Đồ án tốt nghiệp xuất sắc Greenwich Việt Nam
          </Typography>
        </Box>

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

        {/* Display projects in card format */}
        {!loading && !error && (
          <Box
            width={"100%"}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {projects.map((project) => (
              <Card key={project._id} project={project} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Homepage;
