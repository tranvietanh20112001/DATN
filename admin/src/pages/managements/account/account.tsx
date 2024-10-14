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

import { IAccount } from "@interfaces/account.interface";
import axios from "axios";
import { API_IMAGE, API_ACCOUNT } from "@config/app.config";
import Icon from "@components/Icon/Icon";
import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import Color from "@components/Color/Color";
import DeleteAccountModal from "./DeleteAccountModal/DeleteAccountModal";
import UpdateAccountModal from "./UpdateAccountModal/UpdateAccountModal";

const Account = () => {
  const [Accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
  // const [searchQuery, setSearchQuery] = useState<string>("");
  // Add new Account
  const [openAddANewAccountModal, setOpenAddANewAccountModal] = useState(false);
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

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (Account: IAccount) => {
    setSelectedAccount(Account);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedAccount(null);
  };

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
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

  useEffect(() => {
    fetchAccounts();
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
                <StyledTableCell align="center">Hình ảnh</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Accounts.map((Account) => (
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
                  <StyledTableCell>{Account.role}</StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={`${API_IMAGE}/${Account.image}`}
                      width={"80px"}
                      style={{
                        borderRadius: "50%",
                        aspectRatio: "2/2",
                        objectFit: "cover",
                      }}
                    ></img>
                  </StyledTableCell>
                  <StyledTableCell align="right">
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

      {/* Delete Account Modal */}
      {selectedAccount && (
        <DeleteAccountModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteAccount}
          AccountName={selectedAccount.email}
        />
      )}

      {/* Update Account Modal */}
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
