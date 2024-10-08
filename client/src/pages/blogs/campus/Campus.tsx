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
const Campus = () => {
  const [campuses, setCampuses] = useState<ICampus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        {campuses.map((campus) => (
          <Box
            width={"100%"}
            height={"280px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            border={".25px lightGray solid"}
            borderRadius={"12px"}
          >
            <Box
              width={"90%"}
              height={"90%"}
              display={"flex"}
              gap={"32px"}
              sx={{
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.025)",
                  cursor: "pointer",
                },
              }}
            >
              <img
                src={`${API_IMAGE}/${campus.image}`}
                width={"40%"}
                height={"100%"}
                style={{ borderRadius: "12px" }}
              ></img>

              <Box>
                <Typography>{campus.name}</Typography>
                <Typography>{campus.location}</Typography>
                <Typography>{campus.description}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Campus;
