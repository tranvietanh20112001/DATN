import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import backgroundImage from "../../assets/authbackground.jpg"
import C from "../../components/Color/Color"
export default function authLayout(): JSX.Element  {
    return (
        <>
        <Box width={"100%"} height={"100vh"} display={"flex"} overflow={"hidden"}>
            <Box width={"50%"} height={"100%"}>
                <img src= {backgroundImage} width={"100%"} height={"100%"} />
            </Box>
            <Box width={"50%"} height={"100%"}>
            <Box width={"100%"} height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={"20px"} sx={{bgcolor: C.Gray}}>
                <Outlet/>
                </Box>
            </Box>
        </Box>
        
        </>
    )
}

