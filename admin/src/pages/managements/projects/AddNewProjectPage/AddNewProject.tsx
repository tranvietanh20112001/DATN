import { Box, Typography } from "@mui/material";

const AddNewProject = () => {
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
          Tạo mới đồ án
        </Typography>
      </Box>
    </>
  );
};

export default AddNewProject;
