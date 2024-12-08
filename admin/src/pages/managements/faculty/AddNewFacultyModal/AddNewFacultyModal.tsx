import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ICreateANewFaculty } from "../../../../interfaces/faculty.interface";
import { ICampus } from "../../../../interfaces/campus.interface";
import { useEffect, useState } from "react";
import { API_FACULTY, API_CAMPUS } from "../../../../config/app.config";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import { style } from "@components/ModalStyle/modal.styled";
export default function AddNewFacultyModal({
  open,
  handleClose,
  fetchFaculties,
}: {
  open: boolean;
  handleClose: () => void;
  fetchFaculties: () => void;
}) {
  const [campuses, setCampuses] = useState<ICampus[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await axios.get(`${API_CAMPUS}/get-all-campuses`);
        setCampuses(response.data);
      } catch (error) {
        console.error("Error fetching brands", error);
      }
    };

    fetchCampuses();
  }, []);

  const initialValues: ICreateANewFaculty = {
    name: "",
    description: "",
    campus: "",
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ICreateANewFaculty) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("campus", values.campus);
    formData.append("description", values.description);
    try {
      await axios.post(`${API_FACULTY}/create-new-faculty`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifySuccess("Tạo mới chuyên ngành thành công");
      fetchFaculties();
      handleClose();
    } catch (error) {
      notifyError("Tạo mới chuyên ngành thất bại");
      setMessage("error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={"bold"}
        >
          Thêm mới chuyên ngành
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"12px"}
              width={"100%"}
              mt={"24px"}
            >
              <Typography>Tên chuyên ngành</Typography>
              <Field as={TextField} variant="outlined" name="name" id="name" />
              <Typography>Tên cơ sở</Typography>
              <Field as={Select} variant="outlined" name="campus" id="campus">
                {campuses.map((campus) => (
                  <MenuItem key={campus._id} value={campus.name}>
                    {campus.name}
                  </MenuItem>
                ))}
              </Field>
              <Typography>Mô tả</Typography>
              <Field
                as={TextField}
                variant="outlined"
                name="description"
                id="description"
                multiline
                maxRows={4}
              />

              <Button variant="contained" color="primary" type="submit">
                Tạo mới
              </Button>
            </Box>
          </Form>
        </Formik>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
}
