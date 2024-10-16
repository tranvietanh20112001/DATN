import { IStudent, IGetStudentById } from "@interfaces/student.interface";
import { Typography, CircularProgress, Box } from "@mui/material";
import { API_IMAGE, API_STUDENT } from "@config/app.config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GetStudentProfile = ({ _id }: IGetStudentById) => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const GetStudentById = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${API_STUDENT}/get-student-by-id`, {
          params: { _id },
        });
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

    if (_id) {
      GetStudentById();
    }
  }, [_id]);

  if (loading) return <CircularProgress />;

  if (error) return <Typography color="error">{error}</Typography>;

  if (!student) return <Typography>No student found</Typography>;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F6F6F7",
          width: "100%",
          height: "344px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Box display={"flex"} height={"64px"} gap={"12px"}>
          <img
            src={`${API_IMAGE}/${student.image}`}
            width={"64px"}
            height={"64px"}
            style={{ borderRadius: "50%" }}
          />
          <Box>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              onClick={() => navigate(`/sinh-vien/${student._id}`)}
              sx={{
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
              }}
            >
              {student.full_name}
            </Typography>
            <Typography variant="body1">{student.MSSV}</Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          width={"70%"}
          textAlign={"center"}
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            textOverflow: "ellipsis",
          }}
        >
          {student.description}
        </Typography>
      </Box>
    </>
  );
};

export default GetStudentProfile;
