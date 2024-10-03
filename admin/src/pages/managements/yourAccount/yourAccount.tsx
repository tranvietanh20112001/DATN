import { Box, TextField, Typography } from "@mui/material";
import { useUser } from "../../../providers/user.provider";

const YourAccount = () => {
  const { user } = useUser();

  return (
    <>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} gap="24px">
        <Box width={"100%"} justifyContent={"space-between"}>
          <Box width={"45%"}></Box>
          <Box
            width={"30%"}
            display={"flex"}
            gap="12px"
            flexDirection={"column"}
          >
            <Typography>Tên đăng nhập</Typography>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              value={user?.email}
              size="small"
            />
            <Typography>Họ và tên</Typography>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              value={user?.role}
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default YourAccount;
