import { Outlet } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import Header from "@components/Header/Header";

export default function BlogLayout(): JSX.Element {
  return (
    <>
      <Box
        width={"80%"}
        margin={"0 auto"}
        display={"flex"}
        flexDirection={"column"}
        gap={"12px"}
      >
        <Header />
        <Divider />
        <Outlet />
      </Box>
    </>
  );
}
