import { API_CAMPUS } from "@config/app.config";
import { ICampus } from "@interfaces/campus.interface";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectInCampus from "./ProjectInCampus/ProjectInCampus";
import StudentsInCampus from "./StudentsInCampus/StudentsInCampus";

const CampusDetail = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  const [campus, setCampus] = useState<ICampus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampus = async () => {
    try {
      const response = await axios.get<ICampus>(
        `${API_CAMPUS}/get-campus-detail/${id}`
      );
      setCampus(response.data);
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

  useEffect(() => {
    fetchCampus();
  }, [id]);

  return (
    <>
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

      {campus && (
        <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
          <Typography variant="h4">
            Đại học Greenwich Việt Nam - cơ sở {campus.name}
          </Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {campus.location}
          </Typography>
          <img
            src={`${campus.image}`}
            alt={`${campus.name}`}
            style={{ width: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
          <Typography variant="body2">{campus.description}</Typography>
        </Box>
      )}

      <Typography variant="h4" mt={4}>
        Các đồ án xuất sắc tại cơ sở {campus?.name}
      </Typography>
      <ProjectInCampus />
      <Typography variant="h4" mt={4}>
        Các sinh viên xuất sắc của cơ sở {campus?.name}
      </Typography>
      <StudentsInCampus />
    </>
  );
};

export default CampusDetail;
