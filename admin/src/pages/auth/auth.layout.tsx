import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import backgroundImage from "../../assets/authbackground.jpg"
import C from "../../components/Color/Color"
export default function authLayout(): JSX.Element  {
    const isMobile = useMediaQuery('(min-width:800px)');
    return (
        <>
        <Box width={"100%"} height={"100vh"} display={"flex"} overflow={"hidden"} sx={{bgcolor: C.Gray}}>
            <Box width={"50%"} height={"100%"} display={isMobile? "block": "none"}>
                <img src= {backgroundImage} width={"100%"} height={"100%"} />
            </Box>
            <Box width={isMobile? "50%" : "100%"} height={"100%"}>
            <Box width={"320px"} margin={"0 auto"} height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={"20px"} >
                <Outlet/>
                </Box>
            </Box>
        </Box>
        
        </>
    )
}

