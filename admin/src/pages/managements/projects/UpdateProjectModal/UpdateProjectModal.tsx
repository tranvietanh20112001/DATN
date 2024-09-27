import { IProject } from "../../../../interfaces/project.interface";
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import SearchStudent from "./SearchStudent";
import SearchTeacher from "./SearchTeacher";
import { IStudent } from "../../../../interfaces/student.interface";
import { ITeacher } from "../../../../interfaces/teacher.interface";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: IProject) => void;
  project: IProject | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Tiêu đề là bắt buộc"),
  link_Youtube_URL: Yup.string().url("Link Youtube không hợp lệ"),
  link_demo_project: Yup.string().url("Link demo không hợp lệ"),
  description: Yup.string(),
  grade: Yup.number()
    .min(40, "Số điểm tối thiểu là 40")
    .max(100, "Số điểm tối đa là 100")
    .required("Số điểm là bắt buộc"),
});

const UpdateProjectModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  onSubmit,
  project,
}) => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [teacher, setTeacher] = useState<ITeacher | null>(null);

  if (!project) return null;

  const initialValues = {
    title: project.title,
    link_Youtube_URL: project.link_Youtube_URL || "",
    link_demo_project: project.link_demo_project || "",
    description: project.description || "",
    grade: project.grade || 0,
    year: project.year || 0,
    faculty: project.faculty || "",
    campus: project.campus || "",
    teacher_name: project.teacher_name || "",
    teacher_id: project.teacher_id || "",
    student_name: project.student_name || "",
    student_id: project.student_id || "",
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Sửa thông tin dự án
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit({ ...project, ...values });
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                marginBottom={"16px"}
              >
                <Box width={"45%"}>
                  <Box display="flex" flexDirection="column" gap="16px">
                    <Field
                      as={TextField}
                      name="title"
                      label="Tiêu đề dự án"
                      size="small"
                      error={touched.title && Boolean(errors.title)}
                      helperText={touched.title && errors.title}
                    />
                    <Field
                      as={TextField}
                      name="link_Youtube_URL"
                      label="Link Youtube"
                      size="small"
                      error={
                        touched.link_Youtube_URL &&
                        Boolean(errors.link_Youtube_URL)
                      }
                      helperText={
                        touched.link_Youtube_URL && errors.link_Youtube_URL
                      }
                    />
                    <Field
                      as={TextField}
                      name="link_demo_project"
                      label="Link demo dự án"
                      size="small"
                      error={
                        touched.link_demo_project &&
                        Boolean(errors.link_demo_project)
                      }
                      helperText={
                        touched.link_demo_project && errors.link_demo_project
                      }
                    />
                    <Field
                      as={TextField}
                      name="description"
                      label="Mô tả dự án"
                      size="small"
                      multiline
                      rows={3}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                    <Field
                      as={TextField}
                      name="grade"
                      label="Số điểm"
                      size="small"
                      type="number"
                      error={touched.grade && Boolean(errors.grade)}
                      helperText={touched.grade && errors.grade}
                    />
                    <Typography>Năm hoàn thành : {project.year}</Typography>
                    <Field
                      as={TextField}
                      name="year"
                      size="small"
                      type="date"
                    />
                  </Box>
                </Box>
                <Box width={"45%"}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYoutubeEmbedUrl(project.link_Youtube_URL) || ""}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                  ></iframe>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" gap="16px">
                <Divider />
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Box width={"45%"}>
                    <SearchStudent onStudentFound={setStudent} />
                  </Box>
                  <Box width={"45%"}>
                    <SearchTeacher onTeacherFound={setTeacher} />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button onClick={onClose} variant="outlined">
                    Hủy
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Lưu
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default UpdateProjectModal;
