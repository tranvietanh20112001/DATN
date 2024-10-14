import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddANewAccountModal from "../account/AddANewAccountModal/AddANewAccountModal";
import { useEffect, useState } from "react";

import { IGetAllAccounts } from "../../../interfaces/user.interface";
import axios from "axios";
import { API_USER } from "../../../config/app.config";
import Icon from "../../../components/Icon/Icon";
import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";

const Account = () => {
  const [openAddANewAccountModal, setOpenAddANewAccountModal] = useState(false);
  const handleOpenAddANewAccountModal = () => setOpenAddANewAccountModal(true);
  const handleCloseAddANewAccountModal = () =>
    setOpenAddANewAccountModal(false);

  const [Users, setUsers] = useState<IGetAllAccounts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<IGetAllAccounts[]>(
        `${API_USER}/get-all-accounts`
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}
      >
        <Typography variant="h4" fontWeight={700}>
          Quản lý tài khoản
        </Typography>

        <Button
          variant="contained"
          sx={{ width: "240px" }}
          onClick={handleOpenAddANewAccountModal}
        >
          Thêm mới tài khoản
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên tài khoản</StyledTableCell>
                <StyledTableCell align="center">Họ và tên</StyledTableCell>
                <StyledTableCell align="center">Chức nghiệp</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Users.map((User) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={User._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {User.email}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {User.full_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{User.role}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.EditIcon sx={{ marginRight: "24px" }} />
                    <Icon.DeleteIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddANewAccountModal
        open={openAddANewAccountModal}
        handleClose={handleCloseAddANewAccountModal}
        fetchAccounts={fetchUsers}
      />
    </>
  );
};

export default Account;
