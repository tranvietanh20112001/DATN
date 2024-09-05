import { Box } from "@mui/material";
import C from "../../components/Color/Color";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function managementLayout(): JSX.Element {
  return (
    <Box width={"100%"} height={"100vh"} bgcolor={C.White}>
      <Header />
      <Box display={"flex"} height={"100%"} width={"100%"}>
        <Navbar />

        <Box margin={"20px auto"} width={"80%"} height={"600px"}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
