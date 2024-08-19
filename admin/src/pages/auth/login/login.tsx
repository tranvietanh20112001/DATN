import { Button, TextField } from "@mui/material"
import logo from "../../../assets/Official_logo_of_Greenwich_Vietnam.png"
export default function Login() {
    return(
        <>
            <img src={logo} height={"200px"} width={"400px"}/>
            <TextField id="username" label="Tên đăng nhập" variant="outlined" fullWidth/>
            <TextField id="password" label="Mật khẩu" variant="outlined" fullWidth type="password"/>
            <Button variant="contained" fullWidth>Đăng nhập</Button>
            </>
    )
}

