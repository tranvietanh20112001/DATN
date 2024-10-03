import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";
import Icon from "@components/Icons/Icon";
import { useNavigate } from "react-router-dom";
const TypoStyled = {
  cursor: "pointer",
  "&:hover": {
    fontWeight: "bold",
  },
};

import logo from "@assets/logo.jpg";
const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        width={"100%"}
        height={"100px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <img src={logo} width={"15%"}></img>
        <Box
          width={"40%"}
          height={50}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={TypoStyled} onClick={() => navigate("/")}>
            Trang chủ
          </Typography>
          <Typography sx={TypoStyled} onClick={() => navigate("/co-so")}>
            Cơ sở
          </Typography>
          <Typography sx={TypoStyled} onClick={() => navigate("/chuyen-nganh")}>
            Chuyên ngành
          </Typography>
          <Typography sx={TypoStyled} onClick={() => navigate("/ve-chung-toi")}>
            Về chúng tôi
          </Typography>
        </Box>
        <Box
          width={"35%"}
          height={50}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            label={"Tìm kiếm"}
            size="small"
            sx={{ width: "50%" }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon.SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            variant="contained"
            sx={{ height: 40, width: "120px" }}
            onClick={() => navigate("/dang-nhap")}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;
