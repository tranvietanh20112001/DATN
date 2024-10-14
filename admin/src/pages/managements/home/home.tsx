import { Box } from "@mui/material";
import { useAccount } from "@providers/account.provider";
const home = () => {
  const { Account } = useAccount();
  return <Box>{Account?.email}</Box>;
};

export default home;
