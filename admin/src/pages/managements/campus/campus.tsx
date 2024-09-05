import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { ICampus } from "../../../interfaces/campus.interface";
import { useEffect, useState } from "react";
import { API_CAMPUS, API_UPLOAD } from "../../../config/app.config";
import AddNewCampusModal from "./AddNewCampusModal/AddNewCampusModal";
const Campus = () => {
  const [campuses, setCampus] = useState<ICampus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openAddNewCampusModal, setOpenAddNewCampusModal] = useState(false);
  const handleOpenAddNewCampusModal = () => setOpenAddNewCampusModal(true);
  const handleCloseAddNewCampusModal = () => setOpenAddNewCampusModal(false);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await axios.get<ICampus[]>(
          `${API_CAMPUS}/get-all-campuses`
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

    fetchCampuses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}
      >
        <Typography variant="h4" fontWeight={700}>
          Quản lý cơ sở
        </Typography>

        <Button
          onClick={handleOpenAddNewCampusModal}
          variant="contained"
          sx={{ width: "240px" }}
        >
          Thêm mới cơ sở
        </Button>
        <Box width={"100%"} display={"flex"} flexWrap={"wrap"} gap={"40px"}>
          {campuses.map((campus) => (
            <Box
              width={"30%"}
              height={"360px"}
              borderRadius={"8px"}
              boxShadow={4}
              flexDirection={"column"}
              sx={{ cursor: "pointer" }}
              gap={"24px"}
              key={campus._id}
            >
              <img
                src={`${API_UPLOAD}/${campus.image}`}
                width={"100%"}
                height={"240px"}
                style={{ borderRadius: " 8px 8px 0 0" }}
              ></img>
              <Typography variant="h5" fontWeight={"bold"} marginLeft={"12px"}>
                {campus.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <AddNewCampusModal
        open={openAddNewCampusModal}
        handleClose={handleCloseAddNewCampusModal}
      />
    </>
  );
};

export default Campus;
