import { Box } from "@mui/material";
import sprinner from "@assets/spinner.png";
const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <Box
        component="img"
        src={sprinner}
        alt="Loading..."
        sx={{
          width: "200px",
          height: "200px",
          animation: "spin 4s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Spinner;
