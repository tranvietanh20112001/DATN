// AddNewProject.tsx
import {
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Field } from "formik";
import { useState } from "react";
import { IStudent } from "../../../../interfaces/student.interface";
import { ITeacher } from "../../../../interfaces/teacher.interface";
import { ICreateANewProject } from "../../../../interfaces/project.interface";
import axios from "axios";
import { API_PROJECT } from "../../../../config/app.config";
import SearchStudent from "./SearchStudent";
import SearchTeacher from "./SearchTeacher";
import Icon from "../../../../components/Icon/Icon";
import { useNavigate } from "react-router-dom";
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
const AddNewProject = () => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [teacher, setTeacher] = useState<ITeacher | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const ProjectInitialValues: ICreateANewProject = {
    title: "",
    link_Youtube_URL: "",
    link_demo_project: "",
    year: new Date().getFullYear(),
    grade: 0,
    faculty: "",
    campus: "",
    teacher_name: "",
    teacher_id: "",
    student_name: "",
    student_id: "",
    description: "",
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  const onSubmitProject = async (values: ICreateANewProject) => {
    if (student && teacher) {
      values.student_id = student._id;
      values.student_name = student.full_name;
      values.teacher_id = teacher._id;
      values.teacher_name = teacher.full_name;
      values.faculty = student.faculty;
      values.campus = student.campus;

      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (pdfFile) {
        formData.append("report_pdf", pdfFile);
      }

      console.log(formData.values);

      try {
        const response = await axios.post(
          `${API_PROJECT}/create-new-project`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Project created successfully", response.data);
        alert("Dự án đã được tạo thành công!");
        navigate("/do-an");
      } catch (error) {
        console.error("Error creating project", error);
        alert("Lỗi khi tạo dự án.");
      }
    } else {
      alert("Bạn phải tìm kiếm và chọn sinh viên và giảng viên trước!");
    }
  };

  return (
    <Formik initialValues={ProjectInitialValues} onSubmit={onSubmitProject}>
      {({ handleSubmit, values }) => (
        <Box display="flex" flexDirection="column" gap="40px">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" fontWeight={700}>
              Tạo mới dự án
            </Typography>
            <Button variant="contained" onClick={() => handleSubmit()}>
              Lưu
            </Button>
          </Box>
          <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
            <Box
              width={"45%"}
              display={"flex"}
              flexDirection={"column"}
              gap={"16px"}
            >
              <Field
                as={TextField}
                name="title"
                label="Tiêu đề dự án"
                size="small"
              />
              <Field
                as={TextField}
                name="link_Youtube_URL"
                label="Link Youtube"
                size="small"
              />
              <Field
                as={TextField}
                name="link_demo_project"
                label="Link demo dự án"
                size="small"
              />
              <Button
                variant="outlined"
                fullWidth
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<Icon.CloudUploadIcon />}
              >
                {pdfFile ? pdfFile.name : "Tải file báo cáo"}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) =>
                    setPdfFile(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                  accept="application/pdf"
                />
              </Button>
              <Field
                as={TextField}
                name="description"
                label={"Mô tả dự án"}
                size={"small"}
              />
              <Field
                as={TextField}
                name="grade"
                label={"Số điểm"}
                size={"small"}
                type="number"
              />
              <Typography>Ngày hoàn thành</Typography>
              <Field
                as={TextField}
                name="completion_date"
                id="completion_date"
                size={"small"}
                type="date"
              />
            </Box>
            <Box width={"45%"}>
              <iframe
                width="100%"
                height="100%"
                src={getYoutubeEmbedUrl(values.link_Youtube_URL) || ""}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              ></iframe>
            </Box>
          </Box>
          <Divider />
          <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
            <Box width={"45%"}>
              <SearchStudent onStudentFound={setStudent} />
            </Box>
            <Box width={"45%"}>
              <SearchTeacher onTeacherFound={setTeacher} />
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default AddNewProject;