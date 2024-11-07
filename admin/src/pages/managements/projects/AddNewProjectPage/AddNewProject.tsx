import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Formik, Field } from "formik";
import { useState } from "react";
import { IStudent } from "@interfaces/student.interface";
import { ITeacher } from "@interfaces/teacher.interface";
import { ICreateANewProject } from "@interfaces/project.interface";
import axios from "axios";
import { API_PROJECT } from "@config/app.config";
import SearchStudent from "./SearchStudent";
import SearchTeacher from "./SearchTeacher";
import Icon from "@components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { VisuallyHiddenInput } from "@components/ModalStyle/modal.styled";
import { notifyError, notifySuccess } from "@utils/notification.utils";
import uploadFileToFirebase from "../../../../firebase/index";
import { UUID } from "uuidjs";
import SearchTag from "./SearchTag";
import { ProjectValidationSchema } from "@validations/project.validation";
const AddNewProject = () => {
  const [student, setStudent] = useState<IStudent | null>(null);
  const [teacher, setTeacher] = useState<ITeacher | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageBanner, setImageBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  // Initial form values for the project
  const ProjectInitialValues: ICreateANewProject = {
    title: "",
    link_Youtube_URL: "",
    link_demo_project: "",
    link_img_banner: "",
    year: new Date().getFullYear(),
    grade: 0,
    faculty: "",
    campus: "",
    teacher_name: "",
    teacher_id: "",
    student_name: "",
    student_id: "",
    description: "",
    file_report_URL: "",
    tags: [],
    images: [],
  };

  // Helper to extract YouTube embed URL
  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  // Handle banner image upload
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  // Handle multiple image uploads
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newFiles = files.slice(0, 5 - images.length);
    setImages((prevImages) => [...prevImages, ...newFiles]);
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Remove the banner image
  const handleDeleteBanner = () => {
    setImageBanner(null);
    setBannerPreview(null);
  };

  // Remove a specific image from the preview and images array
  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  // Form submission handler
  const onSubmitProject = async (values: ICreateANewProject) => {
    if (student && teacher) {
      const formData = new FormData();

      // Append all the project fields
      formData.append("title", values.title);
      formData.append("link_Youtube_URL", values.link_Youtube_URL);
      formData.append("link_demo_project", values.link_demo_project);
      formData.append("year", values.year.toString());
      formData.append("grade", values.grade.toString());
      formData.append("faculty", student.faculty);
      formData.append("campus", student.campus);
      formData.append("teacher_name", teacher.full_name);
      formData.append("teacher_id", teacher._id);
      formData.append("student_name", student.full_name);
      formData.append("student_id", student._id);
      formData.append("description", values.description);

      // Append tags if there are any
      if (values.tags.length > 0) {
        formData.append("tags", JSON.stringify(values.tags));
      }

      // Handle image and PDF uploads
      if (imageBanner) {
        try {
          const imgURL = await uploadFileToFirebase(
            `Project_Images/${UUID.generate()}`,
            imageBanner
          );
          formData.append("link_img_banner", imgURL);
        } catch (error) {
          notifyError("Failed to upload banner image.");
          return;
        }
      }

      if (pdfFile) {
        try {
          const pdfURL = await uploadFileToFirebase(
            `Project_File_Pdf/${UUID.generate()}`,
            pdfFile
          );
          formData.append("file_report_URL", pdfURL);
        } catch (error) {
          notifyError("Failed to upload PDF file.");
          return;
        }
      }

      const imageUrls = [];
      for (const image of images) {
        try {
          const imgURL = await uploadFileToFirebase(
            `Project_Images/${UUID.generate()}`,
            image
          );
          imageUrls.push(imgURL);
        } catch (error) {
          notifyError("Failed to upload one of the images.");
          return;
        }
      }
      if (imageUrls.length > 0) {
        formData.append("images", JSON.stringify(imageUrls));
      }

      try {
        await axios.post(`${API_PROJECT}/create-new-project`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        notifySuccess("Project created successfully.");
        navigate("/do-an");
      } catch (error) {
        notifyError("Failed to create the project.");
      }
    } else {
      alert("Please select both a student and a teacher before submitting.");
    }
  };

  return (
    <Formik
      initialValues={ProjectInitialValues}
      onSubmit={onSubmitProject}
      validationSchema={ProjectValidationSchema}
    >
      {({ handleSubmit, values, errors, touched }) => (
        <Box display="flex" flexDirection="column" gap="40px">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" fontWeight={700}>
              Tạo mới dự án
            </Typography>
            <Button variant="contained" onClick={() => handleSubmit()}>
              Lưu
            </Button>
          </Box>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Box width="45%" display="flex" flexDirection="column" gap="16px">
              <Field
                as={TextField}
                name="title"
                label="Tiêu đề dự án"
                size="small"
                error={touched.title && !!errors.title}
                helperText={touched.title && errors.title}
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

              <Field
                as={TextField}
                name="grade"
                label="Số điểm"
                size="small"
                type="number"
                error={touched.grade && !!errors.grade}
                helperText={touched.grade && errors.grade}
              />

              <Button
                variant="outlined"
                fullWidth
                component="label"
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

              <Box position="relative">
                <Button
                  variant="outlined"
                  fullWidth
                  component="label"
                  startIcon={<Icon.CloudUploadIcon />}
                >
                  {imageBanner ? imageBanner.name : "Tải ảnh banner"}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleBannerUpload}
                  />
                </Button>
                {bannerPreview && (
                  <Box position="relative" mt={2}>
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      width="100%"
                    />
                    <IconButton
                      onClick={handleDeleteBanner}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                      }}
                    >
                      <Icon.CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Button
                variant="outlined"
                fullWidth
                component="label"
                startIcon={<Icon.CloudUploadIcon />}
              >
                Tải danh sách ảnh
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                />
              </Button>

              <Box display="flex" gap="8px" flexWrap="wrap" mt={2}>
                {imagePreviews.map((preview, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                    />
                    <IconButton
                      onClick={() => handleDeleteImage(index)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                      }}
                    >
                      <Icon.CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <SearchTag
                onTagsChange={(newTags) =>
                  (values.tags = newTags.map((tag) => tag.name))
                }
              />
            </Box>

            <Box width="45%">
              {values.link_Youtube_URL && (
                <iframe
                  title="YouTube Video"
                  width="100%"
                  height="300"
                  src={getYoutubeEmbedUrl(values.link_Youtube_URL) || ""}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </Box>
          </Box>

          <Divider />

          <Box display="flex" width="100%" justifyContent="space-between">
            <Box width="45%">
              <SearchStudent onStudentFound={setStudent} />
            </Box>
            <Box width="45%">
              <SearchTeacher onTeacherFound={setTeacher} />
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default AddNewProject;
