import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { IStudent } from "@interfaces/student.interface";
import { ICampus } from "@interfaces/campus.interface";
import { IFaculty } from "@interfaces/faculty.interface";
import { useEffect, useState } from "react";
import {
  API_STUDENT,
  API_CAMPUS,
  API_FACULTY,
  API_IMAGE,
} from "@config/app.config";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import Icon from "@components/Icon/Icon";
import { notifySuccess } from "@utils/notification.utils";
import {
  style,
  VisuallyHiddenInput,
} from "@components/ModalStyle/modal.styled";

export default function UpdateStudentModal({
  open,
  handleClose,
  fetchStudents,
  StudentData,
}: {
  open: boolean;
  handleClose: () => void;
  fetchStudents: () => void;
  StudentData: IStudent;
}) {
  const [campuses, setCampuses] = useState<ICampus[]>([]);
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(
    StudentData?.campus || null
  );
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(
    StudentData?.faculty || null
  );
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await axios.get(`${API_CAMPUS}/get-all-campuses`);
        setCampuses(response.data);
      } catch (error) {
        console.error("Error fetching campuses", error);
      }
    };

    fetchCampuses();
  }, []);

  useEffect(() => {
    if (selectedCampus) {
      const fetchFaculties = async () => {
        try {
          const response = await axios.get(
            `${API_FACULTY}/get-faculties-by-campus?campus=${selectedCampus}`
          );
          setFaculties(response.data);
          setSelectedFaculty(StudentData.faculty || null); // Reset faculty when campus changes
        } catch (error) {
          console.error("Error fetching faculties:", error);
        }
      };

      fetchFaculties();
    }
  }, [selectedCampus, StudentData.faculty]);

  const initialValues: IStudent = {
    _id: StudentData._id,
    full_name: StudentData.full_name,
    description: StudentData.description,
    campus: StudentData.campus || "",
    faculty: StudentData.faculty || "",
    image: StudentData.image,
    email: StudentData.email,
    MSSV: StudentData.MSSV,
    personal_email: StudentData.personal_email,
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: IStudent) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("campus", values.campus);
    formData.append("email", values.email);
    formData.append("faculty", values.faculty);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.put(
        `${API_STUDENT}/update-Student/${StudentData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Cập nhật học sinh thành công");
      handleClose();
      fetchStudents();
      console.log(response);
    } catch (error) {
      setMessage("error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setPreviewUrl(null);
      }}
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
          Cập nhật học sinh
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
                <Typography>Tên học sinh</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="full_name"
                  id="full_name"
                />
                <Typography>Email</Typography>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="email"
                  id="email"
                />
                <Typography>Tên cơ sở</Typography>
                <Field
                  as={Select}
                  variant="outlined"
                  name="campus"
                  id="campus"
                  value={selectedCampus || ""} // Ensure default value is empty string if null
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
                <Typography>Chuyên ngành</Typography>
                <Field
                  as={Select}
                  variant="outlined"
                  name="faculty"
                  id="faculty"
                  value={selectedFaculty || ""} // Ensure default value is empty string if null
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const faculty = e.target.value;
                    setFieldValue("faculty", faculty);
                    setSelectedFaculty(faculty);
                  }}
                >
                  {faculties.map((faculty) => (
                    <MenuItem key={faculty._id} value={faculty.name}>
                      {faculty.name}
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
                />

                {StudentData.image && !image && (
                  <img
                    src={`${API_IMAGE}/${StudentData.image}`}
                    alt="Student's Image"
                    width="50%"
                    height={"50%"}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      aspectRatio: "2 / 2",
                      margin: "0 auto",
                    }}
                  />
                )}

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
                  <img src={previewUrl} alt="Image Preview" width="100%" />
                )}

                <Button variant="contained" color="primary" type="submit">
                  Cập nhật học sinh
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
