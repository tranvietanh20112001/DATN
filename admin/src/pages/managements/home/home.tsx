import { Box } from "@mui/material";
import { useUser } from "../../../providers/user.provider";
const home = () => {
  const { user } = useUser();
  return <Box>{user?.email}</Box>;
};

export default home;
