import { getColorsForDepartment } from "@components/Color/Color";
import { API_IMAGE } from "@config/app.config";
import { IStudent } from "@interfaces/student.interface";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface StudentCardProps {
  student: IStudent;
}
const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { textColor, backgroundColor } = getColorsForDepartment(
    student.faculty
  );

  const navigate = useNavigate();

  return (
    <>
      <Box
        width={"200px"}
        padding={"12px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"12px"}
        borderRadius={"8px"}
        boxShadow={3}
        sx={{
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.025)",
            cursor: "pointer",
          },
        }}
        onClick={() => navigate(`/sinh-vien/${student._id}`)}
      >
        <img
          src={`${student.image}`}
          alt={`${student.full_name}`}
          style={{
            width: "100%",
            minHeight: "200px",
            height: "200px",
            border: "0.25px solid gray",
            borderRadius: "8px",
          }}
        ></img>
        <Typography variant="h5">{student.full_name}</Typography>
        <Typography
          bgcolor={backgroundColor}
          padding={"12px"}
          borderRadius="6px"
          color={textColor}
          fontWeight={"bold"}
          sx={{ display: "block" }}
        >
          {student.faculty}
        </Typography>
      </Box>
    </>
  );
};

export default StudentCard;
