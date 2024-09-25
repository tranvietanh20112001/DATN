// components/SearchTeacher.tsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import {
  ITeacher,
  ISearchTeacherByEmail,
} from "../../../../interfaces/teacher.interface";
import { API_TEACHER } from "../../../../config/app.config";

interface SearchTeacherProps {
  onTeacherFound: (teacher: ITeacher) => void;
}

const SearchTeacher: React.FC<SearchTeacherProps> = ({ onTeacherFound }) => {
  const [teacher, setTeacher] = useState<ITeacher | null>(null);
  const [error, setError] = useState<string>("");

  const validationTeacherSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });

  const handleSearchTeacher = async (values: ISearchTeacherByEmail) => {
    try {
      const response = await axios.get<ITeacher>(`${API_TEACHER}/search`, {
        params: { email: values.email },
      });
      setTeacher(response.data);
      onTeacherFound(response.data);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError("Teacher not found");
      } else {
        setError("Error fetching teacher");
      }
      setTeacher(null);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationTeacherSchema}
      onSubmit={handleSearchTeacher}
    >
      {({ errors, touched }) => (
        <Form>
          <Box width={"100%"} display="flex" flexDirection="column" gap="16px">
            <Box display="flex" justifyContent="space-between">
              <Field
                as={TextField}
                name="email"
                label="Email giảng viên"
                size="small"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ width: "75%" }}
              />
              <Button variant="contained" type="submit">
                Tìm kiếm
              </Button>
            </Box>

            <TextField
              label="Họ và tên"
              value={teacher ? teacher.full_name : ""}
              disabled
              size="small"
            />
            <TextField
              label="Cơ sở"
              value={teacher ? teacher.campus : ""}
              disabled
              size="small"
            />
            <TextField
              label="Chuyên ngành"
              value={teacher ? teacher.faculty : ""}
              disabled
              size="small"
            />

            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SearchTeacher;
