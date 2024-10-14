import { Box, TextField, Typography } from "@mui/material";
import { useAccount } from "../../../providers/account.provider";

const YourAccount = () => {
  const { Account } = useAccount();

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
              value={Account?.email}
              size="small"
            />
            <Typography>Họ và tên</Typography>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              value={Account?.role}
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default YourAccount;
