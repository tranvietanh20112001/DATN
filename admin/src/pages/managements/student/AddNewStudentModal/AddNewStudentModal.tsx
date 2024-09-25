import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ICreateANewStudent } from "../../../../interfaces/student.interface";
import { ICampus } from "../../../../interfaces/campus.interface";
import { IFaculty } from "../../../../interfaces/faculty.interface";
import { useEffect, useState } from "react";
import {
  API_STUDENT,
  API_CAMPUS,
  API_FACULTY,
} from "../../../../config/app.config";
import axios from "axios";
import { MenuItem, Select, styled } from "@mui/material";
import Icon from "../../../../components/Icon/Icon";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  borderRadius: 4,
  p: 4,
  "@media only screen and (max-width: 600px)": {
    width: "90%",
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddNewStudentModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [campuses, setCampuses] = useState<ICampus[]>([]);
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  useEffect(() => {
    if (selectedCampus) {
      const fetchClasses = async () => {
        try {
          const response = await axios.get(
            `${API_FACULTY}/get-faculties-by-campus?campus=${selectedCampus}`
          );
          setFaculties(response.data);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };

      fetchClasses();
    }
  }, [selectedCampus]);

  const initialValues: ICreateANewStudent = {
    full_name: "",
    description: "",
    campus: "",
    faculty: "",
    image: "",
    email: "",
    personal_email: "",
    MSSV: "",
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ICreateANewStudent) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("campus", values.campus);
    formData.append("email", values.email);
    formData.append("personal_email", values.personal_email);
    formData.append("faculty", values.faculty);
    formData.append("description", values.description);
    formData.append("MSSV", values.MSSV);
    if (values.image) {
      formData.append("image", values.image);
    }

    console.log(formData.values);
    try {
      const response = await axios.post(
        `${API_STUDENT}/create-new-Student`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
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
          Thêm mới sinh viên
        </Typography>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={"12px"}
                width={"100%"}
                mt={"24px"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography>Tên sinh viên</Typography>
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="full_name"
                      id="full_name"
                    />
                  </Box>

                  <Box
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography>Mã số sinh viên</Typography>
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="MSSV"
                      id="MSSV"
                    />
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography>Email</Typography>
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="email"
                      id="email"
                    />
                  </Box>
                  <Box
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography>Email cá nhân</Typography>
                    <Field
                      as={TextField}
                      variant="outlined"
                      name="personal_email"
                      id="personal_email"
                    />
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography>Tên cơ sở</Typography>
                    <Field
                      as={Select}
                      variant="outlined"
                      name="campus"
                      id="campus"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const campus = e.target.value;
                        setFieldValue("campus", campus);
                        setSelectedCampus(campus);
                      }}
                    >
                      {campuses.map((campus) => (
                        <MenuItem key={campus._id} value={campus.name}>
                          {campus.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                  <Box
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography>Chuyên ngành</Typography>
                    <Field
                      as={Select}
                      variant="outlined"
                      name="faculty"
                      id="faculty"
                      disabled={!selectedCampus}
                    >
                      {faculties.map((faculty) => (
                        <MenuItem key={faculty._id} value={faculty.name}>
                          {faculty.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </Box>

                <Typography>Mô tả</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="description"
                  id="description"
                  multiline
                />

                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<Icon.CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                      setFieldValue("image", file);
                    }}
                  />
                </Button>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    width="20%"
                    style={{ margin: "0 auto" }}
                  />
                )}

                <Button variant="contained" color="primary" type="submit">
                  Tạo mới
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        {message && <p>{message}</p>}
      </Box>
    </Modal>
  );
}
