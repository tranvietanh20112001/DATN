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
import axios from "axios";
import { ITag } from "@interfaces/tag.interface";
import { useEffect, useState } from "react";
import { API_TAG } from "@config/app.config";
import CreateNewTagModal from "./CreateNewTagModal/CreateNewTagModal";
import Color from "@components/Color/Color";
import Icon from "@components/Icon/Icon";
import DeleteTagModal from "./DeleteTagModal/DeleteTagModal";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import UpdateTagModal from "./UpdateTagModal/UpdateTagModal";

import {
  StyledTableCell,
  StyledTableRow,
} from "@components/TableStyle/Table.styled";

const Tag = () => {
  const [tags, setTag] = useState<ITag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);

  // Add New Tag Modal
  const [openAddNewTagModal, setOpenAddNewTagModal] = useState(false);
  const handleOpenAddNewTagModal = () => setOpenAddNewTagModal(true);
  const handleCloseAddNewTagModal = () => setOpenAddNewTagModal(false);
  const fetchTags = async () => {
    try {
      const response = await axios.get<ITag[]>(`${API_TAG}/get-all-tags`);
      console.log(response.data);
      setTag(response.data);
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
    fetchTags();
  }, []);

  //Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openModal = (Tag: ITag) => {
    setSelectedTag(Tag);
    setOpenDeleteModal(true);
  };
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedTag(null);
  };

  const handleDeleteTag = async () => {
    if (selectedTag) {
      try {
        await axios.delete(`${API_TAG}/delete-Tag/${selectedTag._id}`);
        setTag((prevTag) =>
          prevTag.filter((Tag) => Tag._id !== selectedTag._id)
        );
        notifySuccess("Dự án đã được xóa thành công!");
      } catch (error) {
        notifyError("Xóa dự án thất bại");
        setError("Lỗi khi xóa dự án.");
      }
    }
  };

  //Update Modal
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const openUpdateTagModal = (Tag: ITag) => {
    setSelectedTag(Tag);
    setOpenUpdateModal(true);
  };

  const closeUpdateTagModal = () => {
    setOpenUpdateModal(false);
    setSelectedTag(null);
  };

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
          Quản lý Tag
        </Typography>

        <Button
          onClick={handleOpenAddNewTagModal}
          variant="contained"
          sx={{ width: "240px" }}
        >
          Thêm mới tag
        </Button>

        <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
          <Table sx={{ minWidth: 750 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Tên tag</StyledTableCell>
                <StyledTableCell>Màu sắc</StyledTableCell>
                <StyledTableCell align="right">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((tag) => (
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={tag._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {tag._id}
                  </StyledTableCell>
                  <StyledTableCell>{tag.name}</StyledTableCell>
                  <StyledTableCell>
                    <Box width={"40px"} height={"20px"} bgcolor={tag.color} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Icon.EditIcon
                      sx={{
                        marginRight: "16px",
                        cursor: "pointer",
                        ":hover": { color: Color.Yellow },
                      }}
                      onClick={() => openUpdateTagModal(tag)}
                    />
                    <Icon.DeleteIcon
                      sx={{
                        cursor: "pointer",
                        ":hover": { color: Color.Red },
                      }}
                      onClick={() => openModal(tag)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <CreateNewTagModal
        open={openAddNewTagModal}
        handleClose={handleCloseAddNewTagModal}
        fetchTags={fetchTags}
      />

      {selectedTag && (
        <DeleteTagModal
          open={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDeleteTag}
          TagName={selectedTag.name}
        />
      )}

      {selectedTag && (
        <UpdateTagModal
          open={openUpdateModal}
          onClose={closeUpdateTagModal}
          Tag={selectedTag}
          fetchTags={fetchTags}
        />
      )}
    </>
  );
};

export default Tag;
