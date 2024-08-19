import { Box, Button, TextField, Typography } from "@mui/material";

const ListOfProjects = () => {
    return (
        <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h4" fontWeight={700}>Quản lý đồ án</Typography>
                <TextField variant="outlined" label="Tìm kiếm" size="small"></TextField>
                <Button variant="contained" size="small">Thêm mới</Button>
            </Box>
        </Box>
    )
}

export default ListOfProjects;