import { Outlet } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
export default function BlogLayout(): JSX.Element {
  return (
    <>
      <Box
        width={"100%"}
        margin={"0 auto"}
        display={"flex"}
        flexDirection={"column"}
        gap={"12px"}
      >
        <Header />
        <Divider />
        <Outlet />
        <Divider />
        <Footer />
      </Box>
    </>
  );
}
