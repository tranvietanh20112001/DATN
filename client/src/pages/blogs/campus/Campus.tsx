import Banner from "@components/Banner/Banner";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { ICampus } from "@interfaces/campus.interface";
import { API_CAMPUS, API_IMAGE } from "@config/app.config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Campus = () => {
  const [campuses, setCampuses] = useState<ICampus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<ICampus[]>(
          `${API_CAMPUS}/get-all-campuses`
        );
        setCampuses(response.data);
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
      <Banner />
      <Divider />
      <Box display={"flex"} flexDirection={"column"} gap="24px">
        <Typography variant="h4" textAlign={"center"} fontWeight={"bold"}>
          Giới thiệu về Greenwich Việt Nam
        </Typography>
        <Typography variant="body2" textAlign={"center"} marginBottom={"24px"}>
          Greenwich Việt Nam là chương trình liên kết quốc tế của Trường Đại học
          FPT và Đại học Greenwich, Vương Quốc Anh từ năm 2009. Với sứ mệnh nâng
          cao chất lượng nguồn nhân lực Việt Nam theo hướng hội nhập quốc tế,
          Greenwich Việt Nam đào tạo chương trình đại học nguyên bản của Anh
          Quốc. Hiện nay, trường có 4 cơ sở đào tạo bậc đại học tại các thành
          phố lớn là Hà Nội, Đà Nẵng, TP. Hồ Chí Minh và Cần Thơ với đông đảo
          sinh viên đã và đang theo học.
        </Typography>
        <Typography variant="h4" textAlign={"center"} fontWeight={"bold"}>
          Các cơ sở của Greenwich Việt Nam
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

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          width={"100%"}
        >
          {campuses.map((campus) => (
            <Box
              key={campus._id}
              width={"45%"}
              height={"400px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border={".25px lightGray solid"}
              borderRadius={"12px"}
              position="relative"
              boxShadow={3}
              mb={2}
              sx={{
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.025)",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/co-so/${campus._id}`)}
            >
              <img
                src={`${campus.image}`}
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: "12px", objectFit: "cover" }}
                alt={campus.name}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                sx={{
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white",
                  background: "rgba(0, 0, 0, 0.8)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="h6">{campus.name}</Typography>
                <Typography variant="body2">{campus.location}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Campus;
