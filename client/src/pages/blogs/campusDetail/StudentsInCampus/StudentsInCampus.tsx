import StudentCard from "@components/StudentCard/StudentCard";
import { API_STUDENT } from "@config/app.config";
import { IStudent } from "@interfaces/student.interface";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentsInCampus = () => {
  const { id } = useParams<{ id: string }>();
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentsByCampusId = async () => {
    try {
      const response = await axios.get<IStudent[]>(
        `${API_STUDENT}/get-students-by-campus/${id}`
      );
      setStudents(response.data);
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
    fetchStudentsByCampusId();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {students.length === 0 ? (
        <Typography>Không tìm thấy sinh viên</Typography>
      ) : (
        <Box
          width={"100%"}
          display={"flex"}
          gap={"24px"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {students.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default StudentsInCampus;
