import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import { ICreateANewTeacher } from "../../../../interfaces/teacher.interface";
import { ICampus } from "../../../../interfaces/campus.interface";
import { IFaculty } from "../../../../interfaces/faculty.interface";
import { useEffect, useState } from "react";
import {
  API_TEACHER,
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
  width: 540,
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

export default function AddNewTeacherModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [campuses, setCampuses] = useState<ICampus[]>([]);
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
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

  const initialValues: ICreateANewTeacher = {
    full_name: "",
    description: "",
    campus: "",
    faculty: "",
    image: "",
    email: "",
  };

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: ICreateANewTeacher) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("campus", values.campus);
    formData.append("email", values.email);
    formData.append("faculty", values.faculty);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    console.log(formData.values);
    try {
      const response = await axios.post(
        `${API_TEACHER}/create-new-teacher`,
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
          Thêm mới giáo viên
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
                  disabled={!selectedCampus}
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
