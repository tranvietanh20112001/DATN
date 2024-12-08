import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddANewAccountModal from "../account/AddANewAccountModal/AddANewAccountModal";
import { useEffect, useState } from "react";

import { IAccount } from "@interfaces/account.interface";
import axios from "axios";
import { API_ACCOUNT } from "@config/app.config";
import Icon from "@components/Icon/Icon";
import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import Color from "@components/Color/Color";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";
import UpdateAccountModal from "./UpdateAccountModal/UpdateAccountModal";
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal";
import Spinner from "@components/Spinner/Spinner";

const Account = () => {
  const [Accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openAddANewAccountModal, setOpenAddANewAccountModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const handleOpenAddANewAccountModal = () => setOpenAddANewAccountModal(true);
  const handleCloseAddANewAccountModal = () =>
    setOpenAddANewAccountModal(false);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get<IAccount[]>(
        `${API_ACCOUNT}/get-all-accounts`
      );
      setAccounts(response.data);
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

  const openModal = (Account: IAccount) => {
    setSelectedAccount(Account);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedAccount(null);
  };

  const openChangePasswordAccountModal = (Account: IAccount) => {
    setSelectedAccount(Account);
    setOpenChangePasswordModal(true);
  };
  const closeChangePasswordAccountModal = () => {
    setOpenChangePasswordModal(false);
    setSelectedAccount(null);
  };

  const openUpdateAccountModal = (Account: IAccount) => {
    setSelectedAccount(Account);
    setOpenUpdateModal(true);
  };
  const closeUpdateAccountModal = () => {
    setOpenUpdateModal(false);
    setSelectedAccount(null);
  };

  const handleDeleteAccount = async () => {
    if (selectedAccount) {
      try {
        await axios.delete(
          `${API_ACCOUNT}/delete-account/${selectedAccount._id}`
        );
        setAccounts((prevAccounts) =>
          prevAccounts.filter((Account) => Account._id !== selectedAccount._id)
        );
        notifySuccess("Tài khoản đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa tài khoản thất bại");
        setError("Lỗi khi xóa tài khoản.");
      }
    }
  };

  const filteredAccounts = Accounts.filter(
    (account) =>
      ((account.full_name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
        (account.email?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        )) &&
      (!selectedRole || account.role === selectedRole)
  );

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading) return <Spinner />;
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

        <Box display={"flex"} gap={"24px"}>
          <Button
            variant="contained"
            sx={{ width: "240px" }}
            onClick={handleOpenAddANewAccountModal}
          >
            Thêm mới tài khoản
          </Button>
          <FormControl size="small">
            <Select
              value={selectedRole || ""}
              onChange={(e) => setSelectedRole(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Tất cả chức nghiệp</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"editor"}>Editor</MenuItem>
              <MenuItem value={"guest"}>Khách hàng</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            variant="outlined"
            placeholder="Tìm kiếm theo tên tài khoản hay tên đầy đủ của tài khoản"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "240px" }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Tên tài khoản</StyledTableCell>
                <StyledTableCell align="center">Họ và tên</StyledTableCell>
                <StyledTableCell align="center">Chức nghiệp</StyledTableCell>
                <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAccounts.map((Account) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={Account._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {Account.email}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {Account.full_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {Account.role}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={`${Account.image}`}
                      width={"80px"}
                      style={{
                        borderRadius: "50%",
                        aspectRatio: "2/2",
                        objectFit: "cover",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.VpnKeyIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.DarkBlue },
                      }}
                      onClick={() => openChangePasswordAccountModal(Account)}
                    />
                    <Icon.EditIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.Yellow },
                      }}
                      onClick={() => openUpdateAccountModal(Account)}
                    />

                    <Icon.DeleteIcon
                      sx={{
                        cursor: "pointer",
                        ":hover": { color: Color.Red },
                      }}
                      onClick={() => openModal(Account)}
                    />
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
        fetchAccounts={fetchAccounts}
      />

      {selectedAccount && (
        <DeleteAccountModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteAccount}
          AccountName={selectedAccount.email}
        />
      )}

      {selectedAccount && (
        <ChangePasswordModal
          open={openChangePasswordModal}
          onClose={closeChangePasswordAccountModal}
          Account={selectedAccount}
        />
      )}

      {selectedAccount && (
        <UpdateAccountModal
          open={openUpdateModal}
          handleClose={closeUpdateAccountModal}
          AccountData={selectedAccount}
          fetchAccounts={fetchAccounts}
        />
      )}
    </>
  );
};

export default Account;
