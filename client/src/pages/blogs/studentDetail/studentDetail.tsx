import { API_STUDENT } from "@config/app.config";
import { IStudent } from "@interfaces/student.interface";
import { Box, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery("(min-width:800px)");
  useEffect(() => {
    if (id) {
      fetchStudentById();
    }
  }, [id]);

  const fetchStudentById = async () => {
    try {
      const response = await axios.get(
        `${API_STUDENT}/get-student-by-id?_id=${id}`
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

  if (!id) return <Typography>No student found.</Typography>;
  if (loading) return <Typography>Loading student details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!student) return <Typography>No student found.</Typography>;

  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        mt={2}
        flexDirection={isMobile ? "row" : "column"}
      >
        <Box
          width={isMobile ? "50%" : "100%"}
          justifyContent={"center"}
          display={"flex"}
        >
          <img
            src={`${student.image}`}
            width={"100%"}
            height={isMobile ? "auto" : "400px"}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid gray",
              boxShadow: "3",
              maxWidth: "400px",
            }}
            alt="Student"
          />
        </Box>
        <Box
          width={isMobile ? "50%" : "100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"12px"}
        >
          <Typography variant="h3" fontWeight={"Bold"}>
            {student.full_name}
          </Typography>
          <Typography variant="h6">
            Cơ sở: <strong>{student.campus}</strong>
          </Typography>
          <Typography variant="h6">
            Chuyên ngành: <strong>{student.faculty}</strong>
          </Typography>
          <Typography variant="h5">Mô tả</Typography>
          <Typography variant="body1">{student.description}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default StudentDetail;
