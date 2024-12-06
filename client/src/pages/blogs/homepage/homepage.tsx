import { useEffect, useState } from "react";
import Banner from "@components/Banner/Banner";
import {
  Box,
  Divider,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Card from "@components/Card/Card";
import { IProject } from "@interfaces/project.interface";
import axios from "axios";
import { API_PROJECT } from "@config/app.config";

const Homepage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const isMobile = useMediaQuery("(max-width:780px)");

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

  // Filter projects based on the search query and selected year
  const filteredProjects = projects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((project) => {
      if (selectedYear) {
        return project.year === parseInt(selectedYear, 10);
      }
      return true;
    });

  // Sort projects based on the selected sort option
  const sortedProjects = [...filteredProjects];
  if (sortOption === "viewsAsc") {
    sortedProjects.sort((a, b) => a.number_of_views - b.number_of_views);
  } else if (sortOption === "viewsDesc") {
    sortedProjects.sort((a, b) => b.number_of_views - a.number_of_views);
  } else if (sortOption === "likesAsc") {
    sortedProjects.sort((a, b) => a.number_of_likes - b.number_of_likes);
  } else if (sortOption === "likesDesc") {
    sortedProjects.sort((a, b) => b.number_of_likes - a.number_of_likes);
  }

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
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Đồ án tốt nghiệp xuất sắc Greenwich Việt Nam
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={isMobile ? "column" : "row"}
          gap={isMobile ? "12px" : 0}
          justifyContent={"space-between"}
          mb="24px"
        >
          <TextField
            label="Search Projects"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth={false}
            sx={{
              width: isMobile ? "100%" : "50%",
            }}
          />
          <Box
            sx={{
              width: isMobile ? "100%" : "40%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControl size="small" sx={{ minWidth: "150px" }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>

                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: "150px" }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                label="Sort By"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="viewsAsc">Views: Ascending</MenuItem>
                <MenuItem value="viewsDesc">Views: Descending</MenuItem>
                <MenuItem value="likesAsc">Likes: Ascending</MenuItem>
                <MenuItem value="likesDesc">Likes: Descending</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
            {sortedProjects.map((project) => (
              <Card key={project._id} project={project} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Homepage;
