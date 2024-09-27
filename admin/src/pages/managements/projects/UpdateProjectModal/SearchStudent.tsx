// components/SearchStudent.tsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import {
  IStudent,
  ISearchStudentByMSSV,
} from "../../../../interfaces/student.interface";
import { API_STUDENT } from "../../../../config/app.config";

interface SearchStudentProps {
  onStudentFound: (student: IStudent) => void;
}

const SearchStudent: React.FC<SearchStudentProps> = ({ onStudentFound }) => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [error, setError] = useState<string>("");

  const validationSchema = Yup.object({
    MSSV: Yup.string().required("MSSV là bắt buộc"),
  });

  const handleSearchStudent = async (values: ISearchStudentByMSSV) => {
    try {
      const response = await axios.get<IStudent>(`${API_STUDENT}/search`, {
        params: { MSSV: values.MSSV },
      });
      setStudent(response.data);
      onStudentFound(response.data);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError("Student not found");
      } else {
        setError("Error fetching student");
      }
      setStudent(null);
    }
  };

  return (
    <Formik
      initialValues={{ MSSV: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSearchStudent}
    >
      {({ errors, touched }) => (
        <Form>
          <Box width={"100%"} display="flex" flexDirection="column" gap="16px">
            <Box display="flex" justifyContent="space-between">
              <Field
                as={TextField}
                name="MSSV"
                label="Mã số sinh viên"
                size="small"
                error={touched.MSSV && Boolean(errors.MSSV)}
                helperText={touched.MSSV && errors.MSSV}
                sx={{ width: "75%" }}
              />
              <Button variant="contained" type="submit">
                Tìm kiếm
              </Button>
            </Box>

            <>
              <TextField
                label="Họ và tên"
                value={student ? student.full_name : ""}
                disabled
                size="small"
              />
              <TextField
                label="Cơ sở"
                value={student ? student.campus : ""}
                disabled
                size="small"
              />
              <TextField
                label="Chuyên ngành"
                value={student ? student.faculty : ""}
                disabled
                size="small"
              />
            </>

            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SearchStudent;
