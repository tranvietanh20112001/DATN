import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ITeacher } from "@interfaces/teacher.interface";
import { ICampus } from "@interfaces/campus.interface";
import { IFaculty } from "@interfaces/faculty.interface";
import { useEffect, useState } from "react";
import {
  API_TEACHER,
  API_CAMPUS,
  API_FACULTY,
  API_IMAGE,
} from "@config/app.config";
import axios from "axios";
import { MenuItem, Select, styled } from "@mui/material";
import Icon from "@components/Icon/Icon";
import { notifySuccess } from "@utils/notification.utils";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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

export default function UpdateTeacherModal({
  open,
  handleClose,
  fetchTeachers,
  teacherData,
}: {
  open: boolean;
  handleClose: () => void;
  fetchTeachers: () => void;
  teacherData: ITeacher;
}) {
  const [campuses, setCampuses] = useState<ICampus[]>([]);
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(
    teacherData?.campus || null
  );
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(
    teacherData?.faculty || null
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
          setSelectedFaculty(teacherData.faculty || null); // Reset faculty when campus changes
        } catch (error) {
          console.error("Error fetching faculties:", error);
        }
      };

      fetchFaculties();
    }
  }, [selectedCampus, teacherData.faculty]);

  const initialValues: ITeacher = {
    _id: teacherData._id,
    full_name: teacherData.full_name,
    description: teacherData.description,
    campus: teacherData.campus || "",
    faculty: teacherData.faculty || "",
    image: teacherData.image,
    email: teacherData.email,
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ITeacher) => {
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
        `${API_TEACHER}/update-teacher/${teacherData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Cập nhật giáo viên thành công");
      handleClose();
      fetchTeachers();
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
          Cập nhật giáo viên
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
                <Typography>Tên giáo viên</Typography>
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

                {teacherData.image && !image && (
                  <img
                    src={`${API_IMAGE}/${teacherData.image}`}
                    alt="Teacher's Image"
                    width="50%"
                    height={"50%"}
                    style={{
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
                  Cập nhật giáo viên
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
